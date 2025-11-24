"""
Utility module for loading and formatting plan data from JSON.
This mirrors the JavaScript formatting logic in static/js/plan-data.js
"""
import json
import os
from django.conf import settings
import re


def slugify_plan_label(label):
    """Convert plan label to URL-friendly slug (mirrors JS logic)"""
    return re.sub(r'[^a-z0-9]+', '-', label.lower())


def load_plan_data():
    """
    Load and format plan data from JSON file.
    Returns a list of plan objects with flattened structure.
    """
    json_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'plans.json')

    with open(json_path, 'r', encoding='utf-8') as f:
        plan_data_unformatted = json.load(f)

    formatted_plans = []

    for plan_key, plan_type_group in plan_data_unformatted.items():
        plan_type_label = plan_type_group['label']

        for sub_type_key, sub_type in plan_type_group['subTypes'].items():
            formatted_plan = {
                **sub_type,
                'planType': plan_type_label,
                'planKey': plan_key,
                'subTypeKey': slugify_plan_label(sub_type['label'])
            }
            formatted_plans.append(formatted_plan)

    return formatted_plans


def get_plan_by_slug(slug):
    """
    Get a single plan by its slug.
    Returns the plan object or None if not found.
    """
    plans = load_plan_data()

    for plan in plans:
        if plan['subTypeKey'] == slug:
            return plan

    return None


def get_plans_by_type(plan_type):
    """
    Get all plans of a specific type (business, marketing, financial).
    Returns a list of plan objects.
    """
    plans = load_plan_data()
    return [plan for plan in plans if plan['planKey'] == plan_type]
