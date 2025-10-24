from django.core.management.base import BaseCommand
from django.db import connection
from django.utils.text import slugify


class Command(BaseCommand):
    help = 'Migrate blog data from blog_blog table to pages_blog table'

    def handle(self, *args, **options):
        cursor = connection.cursor()

        self.stdout.write('Starting blog data migration...')

        # First, check if data already exists in pages_blog
        cursor.execute('SELECT COUNT(*) FROM pages_blog;')
        existing_count = cursor.fetchone()[0]

        if existing_count > 0:
            self.stdout.write(self.style.WARNING(
                f'pages_blog already has {existing_count} records. '
                'Delete them first if you want to re-migrate.'
            ))
            return

        # Fetch all blog posts from blog_blog
        cursor.execute('''
            SELECT id, draft, featured, created_date, title, sub_title,
                   article, image, thumbnail, reading_time, author_id, url
            FROM blog_blog
            ORDER BY id;
        ''')

        blog_posts = cursor.fetchall()
        self.stdout.write(f'Found {len(blog_posts)} blog posts to migrate')

        # Migrate each post
        migrated = 0
        for post in blog_posts:
            (post_id, draft, featured, created_date, title, sub_title,
             article, image, thumbnail, reading_time, author_id, url) = post

            # Convert URL to slug (lowercase with hyphens)
            slug = slugify(url) if url else slugify(title)

            # Generate meta description from article (first 160 chars)
            meta_description = article[:157] + '...' if len(article) > 160 else article
            meta_description = meta_description.replace('\n', ' ').strip()

            # Insert into pages_blog
            cursor.execute('''
                INSERT INTO pages_blog
                (id, draft, featured, created_date, title, sub_title, article,
                 image, thumbnail, reading_time, author_id, slug,
                 meta_description, meta_keywords)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''', (post_id, draft, featured, created_date, title, sub_title,
                  article, image, thumbnail, reading_time, author_id, slug,
                  meta_description, ''))

            migrated += 1

        # Migrate categories many-to-many relationships
        cursor.execute('SELECT blog_id, blogcategory_id FROM blog_blog_categories;')
        category_relations = cursor.fetchall()

        for blog_id, category_id in category_relations:
            cursor.execute(
                'INSERT INTO pages_blog_categories (blog_id, blogcategory_id) VALUES (%s, %s)',
                (blog_id, category_id)
            )

        # Migrate tags many-to-many relationships
        cursor.execute('SELECT blog_id, blogtag_id FROM blog_blog_tags;')
        tag_relations = cursor.fetchall()

        for blog_id, tag_id in tag_relations:
            cursor.execute(
                'INSERT INTO pages_blog_tags (blog_id, blogtag_id) VALUES (%s, %s)',
                (blog_id, tag_id)
            )

        # Update sequence for auto-increment
        cursor.execute('''
            SELECT setval('pages_blog_id_seq',
                         (SELECT MAX(id) FROM pages_blog));
        ''')

        self.stdout.write(self.style.SUCCESS(
            f'Successfully migrated {migrated} blog posts, '
            f'{len(category_relations)} category relations, and '
            f'{len(tag_relations)} tag relations'
        ))
