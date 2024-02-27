from django.urls import path
from .views import LikeList


urlpatterns = [
    path('likes/', LikeList.as_view()),
]
