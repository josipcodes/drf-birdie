from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()

    # ordering
    class Meta:
        ordering = ['name']

    # returning a human-readable form
    def __str__(self):
        return f'{self.name}: {self.description}'
