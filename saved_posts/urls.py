from django.urls import path
from .views import SavedPostList, SavedPostDetail


urlpatterns = [
    path('saved/', SavedPostList.as_view()),
    path('saved/<int:pk>/', SavedPostDetail.as_view()),
]
