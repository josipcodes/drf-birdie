# status potentially unnecessary
from rest_framework import status, permissions, generics 
# from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CompanySerializer
# from drf_api.permissions import IsOwnerOrReadOnly
from .models import Company
from rest_framework.permissions import IsAdminUser

# Create your views here.
class CompanyList(generics.ListCreateAPIView):
    """
    View all companies
    """
    # post form
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        """
        Company creation
        """
        serializer.save()


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve/update/delete a company
    """
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUser]
    queryset = Company.objects.all()