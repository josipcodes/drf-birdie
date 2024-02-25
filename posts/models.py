from django.db import models
from django.contrib.auth.models import User
from categories.models import Category

class Post(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=300)
    # setting date on creation
    created = models.DateTimeField(auto_now_add=True)
    # setting date whenever modified
    modified = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True, upload_to='images/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created']

        def __str__(self):
            return f'{self.id}: {self.content}'