from django.shortcuts import render
from django_filters import rest_framework

# Create your views here.

from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Ticket
from .serializers import TicketSerializer


class TicketViewSet(ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    http_method_names = ["get", "post", "patch"]

    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ["category", "priority", "status"]
    search_fields = ["title", "description"]
