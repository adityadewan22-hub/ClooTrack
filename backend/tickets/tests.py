from django.test import TestCase

# Create your tests here.

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Ticket


class TicketAPITests(APITestCase):

    def test_create_ticket(self):
        url = "/api/tickets/"
        data = {
            "title": "Login issue",
            "description": "Cannot login",
            "category": "technical",
            "priority": "high",
            "status": "open",
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Ticket.objects.count(), 1)
        self.assertEqual(Ticket.objects.first().title, "Login issue")

    def test_filter_by_category(self):
        Ticket.objects.create(
            title="Test",
            description="Test",
            category="technical",
            priority="low",
            status="open",
        )

        response = self.client.get("/api/tickets/?category=technical")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)

    def test_search_ticket(self):
        Ticket.objects.create(
            title="Payment failed",
            description="Card declined",
            category="billing",
            priority="medium",
            status="open",
        )

        response = self.client.get("/api/tickets/?search=Payment")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)

    def test_patch_ticket_status(self):
        ticket = Ticket.objects.create(
            title="Bug",
            description="Something broke",
            category="technical",
            priority="low",
            status="open",
        )

        response = self.client.patch(
            f"/api/tickets/{ticket.id}/", {"status": "resolved"}, format="json"
        )

        self.assertEqual(response.status_code, 200)
        ticket.refresh_from_db()
        self.assertEqual(ticket.status, "resolved")
