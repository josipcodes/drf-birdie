from django.contrib.auth. models import User
from .models import Post
from categories.models import Category
from rest_framework import status
from rest_framework.test import APITestCase


class PostListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='eve', password='pass')
        # creating category, needed for testing post creation
        self.category = Category.objects.create(name='test')

    def test_logged_in_user_can_create_post(self):
        self.client.login(username='eve', password='pass')
        response = self.client.post(
            '/posts/',
            {'content': 'content',
            'category': self.category.id
            })
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
            )

    def test_can_list_posts(self):
        eve = User.objects.get(username='eve')
        Post.objects.create(
            owner=eve,
            content='content',
            category=self.category)
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PostDetailViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='eve', password='pass')
        # creating category, needed for testing post creation
        self.category = Category.objects.create(name='test')

    def test_logged_in_user_can_delete_post(self):
        self.client.login(username='eve', password='pass')
        eve = User.objects.get(username='eve')
        # creating a post
        self.post = Post.objects.create(
            owner=eve,
            content='content',
            category=self.category)
        # deleting the post
        response = self.client.delete(f'/posts/{self.post.id}/')
        count = Post.objects.count()
        self.assertEqual(count, 0)
        # basing status on the Post model delete function
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT
            )