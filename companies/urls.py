from django.urls import path
from .views import CompanyList, CompanyDetail


urlpatterns = [
    path('companies/', CompanyList.as_view()),
    path('companies/<int:pk>', CompanyDetail.as_view()),
]
