# status potentially unnecessary
from rest_framework import status, permissions, generics 
from rest_framework.views import APIView
from .serializers import AdvertisementSerializer
from .models import Advertisement
from rest_framework.permissions import IsAdminUser

# Create your views here.
class AdvertisementList(generics.ListCreateAPIView):
    """
    View all advertisements
    """
    # post form
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        """
        Advertisement creation
        """
        serializer.save()


class AdvertisementDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve/update/delete an Advertisement
    """
    serializer_class = AdvertisementSerializer
    permission_classes = [IsAdminUser]
    queryset = Advertisement.objects.all()