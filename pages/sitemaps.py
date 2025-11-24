from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Blog
from .plan_data import load_plan_data


class BlogSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return Blog.objects.filter(draft=False)

    def lastmod(self, obj):
        return obj.created_date

    def location(self, obj):
        return reverse('blog_single', args=[obj.slug])


class PlanSitemap(Sitemap):
    """Sitemap for dynamic plan pages"""
    changefreq = "monthly"
    priority = 0.9

    def items(self):
        return load_plan_data()

    def location(self, obj):
        return reverse('plan_detail', args=[obj['subTypeKey']])


class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        return [
            'index',
            'about',
            'contact',
            'blog',
            'plans',
            'service-single',
            'for-agencies',
            'faq',
            'pricing',
            'case-study',
            'marketing-plans',
            'business-plans',
            'team',
            'testimonials',
            'consultants',
        ]

    def location(self, item):
        return reverse(item)
