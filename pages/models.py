# ventureplanner3/pages/models.py

from django.db import models
from django.utils import timezone

class BlogCategory(models.Model):
    title = models.CharField(max_length=100, unique=True)
    sub_title = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        db_table = 'blog_blogcategory'
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.title

class BlogTag(models.Model):
    title = models.CharField(max_length=100, unique=True)
    sub_title = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        db_table = 'blog_blogtag'

    def __str__(self):
        return self.title

class BlogAuthor(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='static/blog/authors/', null=True, blank=True)
    description = models.TextField(null=True, blank=True, help_text='Author description')

    class Meta:
        db_table = 'blog_blogauthor'

    def __str__(self):
        return self.name

class Blog(models.Model):
    draft = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=timezone.now)
    # slug = models.SlugField(max_length=255, unique=True, help_text='E.g. how-to-build-a-castle')
    title = models.CharField(max_length=300)
    sub_title = models.TextField(blank=True)
    article = models.TextField()
    image = models.ImageField(upload_to='static/blog/images/')
    thumbnail = models.ImageField(upload_to='static/blog/thumbnails/')
    categories = models.ManyToManyField(BlogCategory, blank=True)
    tags = models.ManyToManyField(BlogTag, blank=True)
    author = models.ForeignKey(BlogAuthor, on_delete=models.SET_NULL, null=True, blank=True)
    reading_time = models.CharField(max_length=50, help_text="E.g. '5 min read'")

    class Meta:
        db_table = 'blog_blog'
        ordering = ['id']

    def __str__(self):
        return self.title

class BlogComment(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    text = models.TextField()
    author_email = models.EmailField()
    author_name = models.CharField(max_length=500)

    class Meta:
        db_table = 'blog_blogcomment'

    def __str__(self):
        return f'Comment by {self.author_name} on {self.blog.title}'