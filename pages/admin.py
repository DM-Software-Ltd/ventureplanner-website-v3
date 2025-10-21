# pages/admin.py
from django.contrib import admin
from .models import BlogCategory, BlogTag, BlogAuthor, Blog, BlogComment

admin.site.register(BlogCategory)
admin.site.register(BlogTag)
admin.site.register(BlogAuthor)
admin.site.register(Blog)
admin.site.register(BlogComment)