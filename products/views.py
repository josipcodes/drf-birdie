from rest_framework import permissions, generics 
from .serializers import ProductSerializer
from .models import Product
from rest_framework.permissions import IsAdminUser

# Create your views here.
class ProductList(generics.ListCreateAPIView):
    """
    View all products
    """
    # post form
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    permission_classes = [IsAdminUser]

    # tbd if permissions need updating
    def perform_create(self, serializer):
        """
        Product creation
        """
        serializer.save()


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve/update/delete a Product if admin.
    """
    # tbd if permissions need updating
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]
    queryset = Product.objects.all()