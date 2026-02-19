from django.db import models
from django.db.models import Q

# Create your models here.


class Category(models.TextChoices):
    BILLING = "billing", "Billing"
    TECHNICAL = "technical", "Technical"
    ACCOUNT = "account", "Account"
    GENERAL = "general", "General"


class Priority(models.TextChoices):
    LOW = "low", "Low"
    MEDIUM = "medium", "Medium"
    HIGH = "high", "High"
    CRITICAL = "critical", "Critical"


class Status(models.TextChoices):
    OPEN = "open", "Open"
    IN_PROGRESS = "in_progress", "In Progress"
    RESOLVED = "resolved", "Resolved"
    CLOSED = "closed", "Closed"


class Ticket(models.Model):
    title = models.CharField(max_length=200, null=False, blank=False)

    description = models.TextField(null=False, blank=False)

    category = models.CharField(
        max_length=20, choices=Category.choices, null=False, blank=False, db_index=True
    )

    priority = models.CharField(
        max_length=20, choices=Priority.choices, null=False, blank=False, db_index=True
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.OPEN,
        null=False,
        blank=False,
        db_index=True,
    )

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.CheckConstraint(
                condition=Q(category__in=[c.value for c in Category]),
                name="valid_category",
            ),
            models.CheckConstraint(
                condition=Q(priority__in=[p.value for p in Priority]),
                name="valid_priority",
            ),
            models.CheckConstraint(
                condition=Q(status__in=[s.value for s in Status]),
                name="valid_status",
            ),
        ]
