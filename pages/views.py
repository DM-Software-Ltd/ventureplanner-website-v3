# pages/views.py

import logging
import requests
from django.shortcuts import render, redirect, get_object_or_404
from django.core.mail import send_mail
from django.core.paginator import Paginator
from django.conf import settings
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from .models import Blog
from .forms import ContactForm
from .plan_data import get_plan_by_slug
import json
import os

# This line creates the logger object.
logger = logging.getLogger(__name__)

def get_level_meta(level):
    """Helper to determine badge color and text."""
    if level <= 2:
        return {'text': 'Low', 'class': 'coral', 'bars': 1}
    if level == 3:
        return {'text': 'Medium', 'class': 'gold', 'bars': 2}
    return {'text': 'High', 'class': 'teal', 'bars': 3}

@csrf_exempt
def support_submit(request):
    if request.method == 'POST':
        token = request.POST.get("cf-turnstile-response")
        verify_url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        data = {"secret": settings.TURNSTILE_SECRET_KEY, "response": token}
        result = requests.post(verify_url, data=data).json()

        if not result.get("success"):
            return JsonResponse({"status": "error", "message": "CAPTCHA failed. Please try again."})

        name = request.POST.get('name')
        email = request.POST.get('email')
        topic = request.POST.get('topic')
        message = request.POST.get('message')

        body = (
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Topic: {topic}\n\n"
            f"Message:\n{message}"
        )

        try:
            send_mail(
                f"Support Request: {topic}",
                body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.CONTACT_US_EMAIL],
                fail_silently=False,
            )
            return JsonResponse({"status": "success", "message": "Your support request has been sent successfully!"})
        except Exception as e:
            logger.error(f"Failed to send support email: {e}")
            return JsonResponse({"status": "error", "message": "Error sending email. Please try again later."})

    return JsonResponse({"status": "error", "message": "Invalid request method."})

def index(request):
    latest_posts = Blog.objects.filter(draft=False)[:4]

    context = { 'latest_posts': latest_posts }

    return render(request, "pages/index.html", context)


def about(request):
    return render(request, "pages/about.html")

def contact(request):
    if request.method == 'POST':
        # Create a form instance and populate it with data from the request
        form = ContactForm(request.POST)

        # Check if the form is valid
        if form.is_valid():
            # Process the form data
            cd = form.cleaned_data
            subject = 'Contact Inquiry from Website'

            # Prepare email body
            body = (
                f"First Name: {cd.get('first_name')}\n"
                f"Last Name: {cd.get('last_name')}\n"
                f"Phone: {cd.get('phone')}\n"
                f"Email: {cd.get('email')}\n\n"
                f"Message:\n{cd.get('message')}"
            )

            try:
                # Send the email
                send_mail(
                    subject,
                    body,
                    settings.DEFAULT_FROM_EMAIL, # Sender's email (from your settings)
                    [settings.CONTACT_US_EMAIL],    # Recipient's email (add to settings)
                    fail_silently=False,
                )
                # Add a success message
                messages.success(request, "Your message has been sent successfully. Thank you!")
                # Redirect to the same page to prevent form resubmission
                return redirect('contact')
            except Exception as e:
                # Handle potential mail server errors
                messages.error(request, "Sorry, something went wrong and we couldn't send your message.")
                logger.error(f"Failed to send contact email: {e}")

    else:
        # If it's a GET request, create a blank form
        form = ContactForm()

    return render(request, "pages/contact.html", {'form': form})

# This is now the ONLY blog function. The old static one is gone.
def blog(request):
    logger.debug("--- Blog view started ---")

    # Filter to only show published posts
    all_posts_list = Blog.objects.filter(draft=False)

    paginator = Paginator(all_posts_list, 8)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    logger.debug(f"Displaying page {page_obj.number} of {paginator.num_pages} ({all_posts_list.count()} total posts found).")

    context = { 'page_obj': page_obj }

    return render(request, "pages/blog.html", context)

def services(request):
    from .plan_data import load_plan_data

    # Get all plans
    all_plans = load_plan_data()

    context = {
        'all_plans': all_plans
    }

    return render(request, "pages/services.html", context)

def for_agencies(request):
    return render(request, "pages/for-agencies.html")

def service_single(request):
    return render(request, "pages/service-single.html")

def plan_detail(request, slug):
    """Dynamic plan detail page based on slug from plan data JSON"""
    plan = get_plan_by_slug(slug)

    if not plan:
        # If plan not found, return 404
        from django.http import Http404
        raise Http404("Plan not found")

    context = {
        'plan': plan,
        'meta_description': plan.get('shortDescription', plan.get('description', ''))[:160],
    }

    return render(request, "pages/service-single.html", context)

def faq(request):
    return render(request, "pages/faq.html")


def blog_single(request, slug):
    post = get_object_or_404(Blog, slug=slug, draft=False)
    context = { 'post': post }

    return render(request, "pages/blog-single.html", context)

def pricing(request):
    return render(request, "pages/pricing.html")

def case_study(request):
    return render(request, "pages/case-study.html")

def case_study_single(request):
    return render(request, "pages/case-study-single.html")

def marketing_plans(request):
    from .plan_data import get_plans_by_type
    marketing_plans_list = get_plans_by_type('marketing')
    latest_posts = Blog.objects.filter(draft=False)[:4]
    file_path = os.path.join(settings.BASE_DIR, 'static', 'data', 'plans.json')
    examples = []

    logger.info(f"Looking for plans.json at: {file_path}")
    logger.info(f"File exists: {os.path.exists(file_path)}")

    try:
        with open(file_path, 'r') as f:
            data = json.load(f)

        logger.info(f"Successfully loaded plans.json")

        # Transform nested JSON structure into flat array for template
        # Map detail levels to numeric values
        level_map = {'low': 2, 'medium': 3, 'high': 4}

        for plan_type, type_data in data.items():
            for subtype_key, subtype_data in type_data.get('subTypes', {}).items():
                # Map the JSON structure to template fields
                plan = {
                    'title': subtype_data.get('label', ''),
                    'subtitle': subtype_data.get('subTitle', ''),
                    'description': subtype_data.get('shortDescription', ''),
                    'type': type_data.get('label', plan_type.capitalize()),
                    'type_slug': plan_type,  # Use the key directly for CSS classes (business, marketing, financial)
                    'strategicLevel': level_map.get(subtype_data.get('detailLevel', {}).get('strategic', 'medium'), 3),
                    'tacticalLevel': level_map.get(subtype_data.get('detailLevel', {}).get('tactical', 'medium'), 3),
                    'time': subtype_data.get('estimatedTime', 'N/A'),
                    'pages': subtype_data.get('pageCount', 'N/A'),
                }

                # Add meta information for badges
                plan['strat_meta'] = get_level_meta(plan['strategicLevel'])
                plan['tact_meta'] = get_level_meta(plan['tacticalLevel'])

                examples.append(plan)

        logger.info(f"Transformed {len(examples)} plans from JSON")

    except FileNotFoundError:
        logger.error(f"plans.json not found at {file_path}")
        examples = []
    except Exception as e:
        logger.error(f"Error loading plans.json: {e}")
        import traceback
        logger.error(traceback.format_exc())
        examples = []

    logger.info(f"Context 'plans' will have {len(examples)} items")

    context = {
        'marketing_plans': marketing_plans_list, # Your original "plans"
        'latest_posts': latest_posts,
        'plans': examples,                       # Business plan examples for the table
    }

    return render(request, "pages/marketing-plans.html", context)

def business_plans(request):
    latest_posts = Blog.objects.filter(draft=False)[:4]

    context = { 'latest_posts': latest_posts }

    return render(request, "pages/business-plans.html", context)

def image_gallery(request):
    return render(request, "pages/image-gallery.html")

def video_gallery(request):
    return render(request, "pages/video-gallery.html")

def team(request):
    return render(request, "pages/team.html")

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

def robots_txt(request):
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /support/submit/",
        "",
        f"Sitemap: {request.scheme}://{request.get_host()}/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")