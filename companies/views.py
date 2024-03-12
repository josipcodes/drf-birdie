from rest_framework import permissions, generics 
from .serializers import CompanySerializer
from .models import Company
from rest_framework.permissions import IsAdminUser

# Create your views here.
class CompanyList(generics.ListCreateAPIView):
    """
    View all companies
    """
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    permission_classes = [IsAdminUser]

    # tbd if permissions need updating
    def perform_create(self, serializer):
        """
        Company creation
        """
        serializer.save()


class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve/update/delete a company if Admin.
    """
    # tbd if permissions need updating
    serializer_class = CompanySerializer
    permission_classes = [IsAdminUser]
    queryset = Company.objects.all()