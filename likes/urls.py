from django.urls import path
from .views import LikeList, LikeDetail


urlpatterns = [
    path('likes/', LikeList.as_view()),
    path('likes/<int:pk>/', LikeDetail.as_view()),
]
