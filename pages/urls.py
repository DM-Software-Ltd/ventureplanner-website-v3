from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("about/", views.about, name="about"),
    path("contact/", views.contact, name="contact"),
    path("consultants/", views.consultants, name="consultants"),
    path("blog/", views.blog, name="blog"),
    path("blog/<int:pk>/", views.blog_single, name="blog_single"),
    path("services/", views.services, name="services"),
    path("for-agencies/", views.for_agencies, name="for-agencies"),
    path("service-single/", views.service_single, name="service-single"),
    path("faq/", views.faq, name="faq"),
    path("pricing/", views.pricing, name="pricing"),
    path("case-study/", views.case_study, name="case-study"),
    path("case-study-single/", views.case_study_single, name="case-study-single"),
    path("marketing-plans/", views.marketing_plans, name="marketing-plans"),
    path("business-plans/", views.business_plans, name="business-plans"),
    path("image-gallery/", views.image_gallery, name="image-gallery"),
    path("video-gallery/", views.video_gallery, name="video-gallery"),
    path("team/", views.team, name="team"),
    path("team-single/", views.team_single, name="team-single"),
    path("testimonials/", views.testimonials, name="testimonials"),
    path("project-single/", views.project_single, name="project-single"),
    path('support/submit/', views.support_submit, name='support_submit'),
]
