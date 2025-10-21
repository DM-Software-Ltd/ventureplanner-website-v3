# pages/management/commands/update_blog_images.py

import json
from django.core.management.base import BaseCommand
from pages.models import Blog

class Command(BaseCommand):
    help = 'Updates blog post image paths from a JSON file.'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='The path to the JSON file containing image data.')

    def handle(self, *args, **options):
        file_path = options['json_file']

        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"File not found at: {file_path}"))
            return

        self.stdout.write("Starting to update blog image paths...")
        updated_count = 0

        for item in data:
            post_id = item.get('id')
            image_path = item.get('image_path')
            thumbnail_path = item.get('thumbnail_path')

            if not post_id:
                self.stdout.write(self.style.WARNING("Skipping item with no ID."))
                continue

            try:
                post = Blog.objects.get(id=post_id)
                # We set the '.name' attribute to directly change the path stored in the database
                if image_path:
                    post.image.name = image_path
                if thumbnail_path:
                    post.thumbnail.name = thumbnail_path

                post.save()
                updated_count += 1
                self.stdout.write(self.style.SUCCESS(f"Successfully updated Post ID: {post.id} - {post.title}"))

            except Blog.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Post with ID {post_id} not found. Skipping."))
            except Exception as e:
                self.stderr.write(self.style.ERROR(f"An error occurred updating Post ID {post_id}: {e}"))

        self.stdout.write(self.style.SUCCESS(f"\nUpdate complete! {updated_count} posts were updated."))