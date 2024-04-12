from rest_framework import permissions, generics 
from .serializers import ProductSerializer
from .models import Product
from rest_framework.permissions import IsAdminUser

class ProductList(generics.ListCreateAPIView):
    # View all products
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAdminUser]

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    # Retrieve/update/delete a Product if admin.
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()