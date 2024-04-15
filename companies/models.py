from django.db import models


class Company(models.Model):
    # Company model.
    company_name = models.CharField(max_length=100)
    internal_notes = models.TextField(max_length=300, blank=True)

    class Meta:
        ordering = ['company_name']

    def __str__(self):
        return self.company_name
