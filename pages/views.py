from django.shortcuts import render

def index(request):
    return render(request, "pages/index.html")

def about(request):
    return render(request, "pages/about.html")

def contact(request):
    return render(request, "pages/contact.html")

def blog(request):
    return render(request, "pages/blog.html")

def services(request):
    return render(request, "pages/services.html")

def for_agencies(request):
    return render(request, "pages/for-agencies.html")

def service_single(request):
    return render(request, "pages/service-single.html")

def faq(request):
    return render(request, "pages/faq.html")

def blog_single(request):
    return render(request, "pages/blog-single.html")

def pricing(request):
    return render(request, "pages/pricing.html", {
        "show_section_title": False  # or True
    })

def case_study(request):
    return render(request, "pages/case-study.html")

def case_study_single(request):
    return render(request, "pages/case-study-single.html")

def marketing_plans(request):
    return render(request, "pages/marketing-plans.html")

def business_plans(request):
    return render(request, "pages/business-plans.html")

def image_gallery(request):
    return render(request, "pages/image-gallery.html")

def business_plans(request):
    return render(request, "pages/business-plans.html")

def image_gallery(request):
    return render(request, "pages/image-gallery.html")

def video_gallery(request):
    return render(request, "pages/video-gallery.html")

def blog_single(request):
    return render(request, "pages/blog-single.html")

def team(request):
    return render(request, "pages/team-single.html")

def team_single(request):
    return render(request, "pages/team-single.html")

def testimonials(request):
    return render(request, "pages/testimonials.html")

def consultants(request):
    return render(request, "pages/consultants.html")

def project_single(request):
    return render(request, "pages/project-single.html")

def custom_404(request, exception):
    return render(request, "pages/404.html", status=404)