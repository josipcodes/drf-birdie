from django.db import models
from companies.models import Company

class Product(models.Model):
    # Product model, related to Company model
    product_name = models.CharField(max_length=150)
    company_name = models.ForeignKey(Company, on_delete=models.CASCADE)
    description = models.TextField(max_length=300, blank=True)


    class Meta:
        ordering = ['product_name']


    def __str__(self):
        return self.product_name
   
