from rest_framework import permissions, generics 
from .serializers import AdvertisementSerializer
from .models import Advertisement
from rest_framework.permissions import IsAdminUser

class AdvertisementList(generics.ListCreateAPIView):
    """
    View all advertisements
    """
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()
    permission_classes = [IsAdminUser]

    # # tbd if permissions need updating
    # def perform_create(self, serializer):
    #     """
    #     Advertisement creation
    #     """
    #     serializer.save()


class AdvertisementDetail(generics.RetrieveAPIView):
    """
    Retrieve an Advertisement.
    """
    # tbd if permissions need updating
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()