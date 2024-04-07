from rest_framework import permissions, generics 
from .serializers import AdvertisementSerializer
# from django_filters.rest_framework import DjangoFilterBackend
from .models import Advertisement
from rest_framework.permissions import IsAdminUser
from datetime import date

class AdvertisementList(generics.ListCreateAPIView):
    """
    View all advertisements
    """
    serializer_class = AdvertisementSerializer

    def get_queryset(self):
        # get only currently valid adds
        today = date.today()
        queryset = Advertisement.objects.all().filter(contract_start__lte=today, contract_end__gte=today)
        return queryset

class AdvertisementDetail(generics.RetrieveAPIView):
    """
    Retrieve an Advertisement.
    """
    # tbd if permissions need updating
    serializer_class = AdvertisementSerializer
    queryset = Advertisement.objects.all()