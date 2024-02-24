from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Category
from .serializers import CategorySerializer

class CategoryList(APIView):
    def get(self, request):
        """
        List all categories
        """
        all_categories = Category.objects.all()
        serializer = CategorySerializer(
            all_categories,
            many=True,
        )
        return Response(serializer.data)


class CategoryDetail(APIView):
    def get(self, request, pk):
        try:
            category = Category.objects.get(pk=pk)
            serializer = CategorySerializer(category)
            return Response(serializer.data)
        except Category.DoesNotExist:
            raise Http404