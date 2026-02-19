from django.shortcuts import render
from django_filters import rest_framework

# Create your views here.

from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Ticket
from .serializers import TicketSerializer
from django.db.models import Count, Avg
from django.db.models.functions import TruncDate
from rest_framework.decorators import action
from rest_framework.response import Response


class TicketViewSet(ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    http_method_names = ["get", "post", "patch"]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["category", "priority", "status"]
    search_fields = ["title", "description"]

    @action(detail=False, methods=["get"], url_path="stats")
    def stats(self, request):
        from .models import Ticket

        # Total tickets
        total_tickets = Ticket.objects.count()

        # Open tickets
        open_tickets = Ticket.objects.filter(status="open").count()

        # Average tickets per day
        tickets_per_day = (
            Ticket.objects.annotate(day=TruncDate("created_at"))
            .values("day")
            .annotate(count=Count("id"))
        )

        avg_tickets_per_day = tickets_per_day.aggregate(avg=Avg("count"))["avg"] or 0

        # Priority breakdown
        priority_counts = Ticket.objects.values("priority").annotate(count=Count("id"))

        # Category breakdown
        category_counts = Ticket.objects.values("category").annotate(count=Count("id"))

        return Response(
            {
                "total_tickets": total_tickets,
                "open_tickets": open_tickets,
                "avg_tickets_per_day": round(avg_tickets_per_day, 2),
                "priority_breakdown": {
                    item["priority"]: item["count"] for item in priority_counts
                },
                "category_breakdown": {
                    item["category"]: item["count"] for item in category_counts
                },
            }
        )
