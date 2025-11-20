from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Blog


class BlogSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return Blog.objects.filter(draft=False)

    def lastmod(self, obj):
        return obj.created_date

    def location(self, obj):
        return reverse('blog_single', args=[obj.slug])


class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    def items(self):
        return [
            'index',
            'about',
            'contact',
            'blog',
            'services',
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
