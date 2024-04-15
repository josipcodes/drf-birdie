from django.urls import path
from .views import AdvertisementList, AdvertisementDetail

urlpatterns = [
    path('advertisements/', AdvertisementList.as_view()),
    path('advertisements/<int:pk>/', AdvertisementDetail.as_view()),
]
