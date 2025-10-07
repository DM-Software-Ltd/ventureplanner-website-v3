from django.urls import resolve

def breadcrumbs(request):
    try:
        match = resolve(request.path_info)
        view_name = match.url_name  # e.g. "service_single"
    except:
        view_name = "page_not_found"  # fallback for 404s

    # Titles for headings
    titles = {
        "index": "Home",
        "about": "About Us",
        "contact": "Contact",
        "blog": "Blog",
        "services": "Our Services",
        "service_single": "Service Details",
        "marketing_plans": "Marketing Plans",
        "business_plans": "Business Plans",
        "case_study": "Case Study",
        "case_study_single": "How Businesses Achieve Growth Using...",
        "page_not_found": "Page Not Found",  # <-- added for 404s
    }

    # Trails use only *URL names*, not display text
    trails = {
        "about": ["index"],
        "contact": ["index"],
        "blog": ["index"],
        "services": ["index"],
        "service_single": ["index", "services"],
        "marketing_plans": ["index", "services"],
        "business_plans": ["index", "services"],
        "case_study_single": ["index", "case_study"],
        # no trail for 404 (just shows itself)
    }

    crumbs = []
    if view_name in trails:
        for parent in trails[view_name]:
            crumbs.append({
                "name": titles.get(parent, parent.title()),
                "url": parent,  # named URL
            })

    if view_name and view_name != "index":
        crumbs.append({
            "name": titles.get(view_name, view_name.title()),
            "url": None,  # active page
        })

    return {
        "page_title": titles.get(view_name, "Page"),
        "breadcrumbs": crumbs,
    }
