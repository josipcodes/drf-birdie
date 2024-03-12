from rest_framework import generics 
from .models import Category
from .serializers import CategorySerializer

class CategoryList(generics.ListCreateAPIView):
        """
        List all categories.
        Permission already set globally in settings.py.
        """
        # need further checks as to ensure no brute force can be used
        queryset = Category.objects.all()
        serializer_class = CategorySerializer


class CategoryDetail(generics.RetrieveAPIView):
    """
    Retrieve a category.
    Only Admin is able to amend categories in admin view.
    Permission already set globally in settings.py.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
