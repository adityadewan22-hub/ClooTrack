import json
from .generation import call_gemini
from ..models import Category, Priority


def classify_ticket(description: str):
    prompt = f"""
You are a support ticket classifier.

Allowed categories:
billing, technical, account, general

Allowed priorities:
low, medium, high, critical

Respond ONLY in valid JSON:

{{
  "category": "...",
  "priority": "..."
}}

Ticket:
\"\"\"{description}\"\"\"
"""

    try:
        raw_response = call_gemini(prompt)

        data = json.loads(raw_response)

        category = data.get("category")
        priority = data.get("priority")

        valid_categories = [c.value for c in Category]
        valid_priorities = [p.value for p in Priority]

        if category not in valid_categories:
            category = "general"

        if priority not in valid_priorities:
            priority = "medium"

        return {"suggested_category": category, "suggested_priority": priority}

    except Exception:
        return {"suggested_category": "general", "suggested_priority": "medium"}
