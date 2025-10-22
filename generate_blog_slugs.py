#!/usr/bin/env python
"""
Generate slugs for existing blog posts that don't have them.
Run this after applying the migration to add the slug field.
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ventureplanner3.settings')
django.setup()

from pages.models import Blog

# Get all blog posts
all_posts = Blog.objects.all()

print(f"Found {all_posts.count()} blog posts")
print("=" * 70)

updated_count = 0
for post in all_posts:
    # Save will trigger the save() method which auto-generates slug
    old_slug = post.slug
    post.save()  # This will generate slug if it's empty

    if not old_slug and post.slug:
        print(f"[+] Generated slug for: {post.title[:50]}")
        print(f"    Slug: {post.slug}")
        updated_count += 1
    elif old_slug:
        print(f"[OK] Already has slug: {post.title[:50]} -> {post.slug}")

print("=" * 70)
print(f"Summary: {updated_count} blog posts had slugs generated")
print(f"Total blog posts: {all_posts.count()}")
