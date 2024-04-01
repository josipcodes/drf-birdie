from django.db.models import Count
from rest_framework import generics, filters
from .models import Category
from .serializers import CategorySerializer

class CategoryList(generics.ListCreateAPIView):
        """
        List all categories.
        Permission already set globally in settings.py.
        """
        # need further checks as to ensure no brute force can be used
        queryset = Category.objects.annotate(
        posts_count=Count('post', distinct=True),
    ).order_by('-posts_count')
    #     # tbd if necessary here
        filter_backends = [
        filters.OrderingFilter
    ]
        ordering_fields = [
        'posts_count',
    ]
        serializer_class = CategorySerializer


class CategoryDetail(generics.RetrieveAPIView):
    """
    Retrieve a category.
    Only Admin is able to amend categories in admin view.
    Permission already set globally in settings.py.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.annotate(
        posts_count=Count('post', distinct=True),
    ).order_by('-posts_count')
