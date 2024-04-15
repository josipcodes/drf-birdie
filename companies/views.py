from rest_framework import permissions, generics
from .serializers import CompanySerializer
from .models import Company
from rest_framework.permissions import IsAdminUser


class CompanyList(generics.ListCreateAPIView):
    """
    View all companies.
    Accessible only internally - meaning Admin
    """
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsAdminUser]


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    # Retrieve/update/delete a company if Admin.
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUser]
    queryset = Company.objects.all()
