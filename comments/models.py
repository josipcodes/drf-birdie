from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


# Comment model has been copied from drf_api lessons
# minor modifications applied
class Comment(models.Model):
    # Comment model, related to User and Post
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    content = models.TextField()

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.content
