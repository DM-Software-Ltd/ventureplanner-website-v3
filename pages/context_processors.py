from django.urls import resolve
from django.conf import settings

def breadcrumbs(request):
    try:
        match = resolve(request.path_info)
        view_name = match.url_name  # e.g. "service_single"
        kwargs = match.kwargs
    except:
        view_name = "page_not_found"  # fallback for 404s
        kwargs = {}

    # Titles for headings
    titles = {
        "index": "Home",
        "about": "About Us",
        "contact": "Contact",
        "blog": "Blog",
        "plans": "Plans",
        "service_single": "Service Details",
        "plan_detail": "Plan Details",
        "marketing_plans": "Marketing Plans",
        "business_plans": "Business Plans",
        "case_study": "Case Study",
        "case_study_single": "How Businesses Achieve Growth Using...",
        "faq": "Frequently Asked Questions",
        "testimonials": "Our Testimonials",
        "page_not_found": "Page Not Found",
    }

    # Trails use only *URL names*, not display text
    trails = {
        "about": ["index"],
        "contact": ["index"],
        "blog": ["index"],
        "plans": ["index"],
        "service_single": ["index", "plans"],
        "plan_detail": ["index", "plans"],
        "marketing_plans": ["index", "plans"],
        "business_plans": ["index", "plans"],
        "case_study_single": ["index", "case_study"],
        "faq": ["index"],
    }

    crumbs = []
    if view_name in trails:
        for parent in trails[view_name]:
            crumbs.append({
                "name": titles.get(parent, parent.title()),
                "url": parent,  # named URL
            })

    if view_name == "plan_detail" and "slug" in kwargs:
        from .plan_data import get_plan_by_slug
        plan = get_plan_by_slug(kwargs["slug"])
        if plan:
            crumbs.append({
                "name": plan['label'],
                "url": None,
            })
            return {
                "page_title": plan['label'],
                "breadcrumbs": crumbs,
            }

    if view_name and view_name != "index":
        crumbs.append({
            "name": titles.get(view_name, view_name.title()),
            "url": None,  # active page
        })

    return {
        "page_title": titles.get(view_name, "Page"),
        "breadcrumbs": crumbs,
    }

def turnstile_keys(request):
    """
    Makes the Cloudflare Turnstile site key globally available to all templates.
    """
    return {
        'TURNSTILE_SITE_KEY': settings.TURNSTILE_SITE_KEY,
    }

def global_text_fields(request):
    return {
        "MAIN_CTA_TEXT": "Try it yourself",
    }