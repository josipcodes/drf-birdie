from django.contrib.auth. models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Category


class CategoryListTests(APITestCase):

    def test_can_list_categories(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
