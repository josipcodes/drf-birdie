from django.db import models
from products.models import Product

class Advertisement(models.Model):

    # Advertisement model, related to Product model

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    description = models.TextField(max_length=300, blank=True)
    contract_start = models.DateTimeField()
    contract_end = models.DateTimeField(blank=True)
    money = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='images/')
    alt = models.CharField(max_length=150)

    class Meta:
        ordering = ['contract_start']


    def __str__(self):
        return self.alt
   
