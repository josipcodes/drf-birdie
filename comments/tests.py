from django.contrib.auth. models import User
from posts.models import Post
from categories.models import Category
from .models import Comment
from rest_framework import status
from rest_framework.test import APITestCase


class CommentListViewTests(APITestCase):
    def setUp(self):
        eve = User.objects.create_user(
            username='eve', 
            password='pass'
            )
        # creating category, needed for creating post
        self.category = Category.objects.create(
            name='test'
            )
        self.post = Post.objects.create(
            owner=eve,
            content='content',
            category=self.category)
        

    def test_logged_in_user_can_create_comment(self):
        self.client.login(
            username='eve', password='pass'
            )
        response = self.client.post(
            '/comments/',
            {'content': 'content',
            'post': self.post.id
            })
        count = Comment.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
            )

    def test_can_list_comments(self):
        response = self.client.get('/comments/')
        self.assertEqual(
            response.status_code, 
            status.HTTP_200_OK
            )

class CommentDetailViewTests(APITestCase):
    def setUp(self):
        eve = User.objects.create_user(
            username='eve', 
            password='pass'
            )
        # creating category, needed for creating post
        self.category = Category.objects.create(
            name='test'
            )
        self.post = Post.objects.create(
            owner=eve,
            content='content',
            category=self.category)
        self.comment = Comment.objects.create(
            owner=eve,
            content='content',
            post=self.post
        )
        print("comment", self.comment.id)

    def test_logged_in_user_can_delete_comment(self):
        self.client.login(
            username='eve', password='pass'
            )
        # deleting the comment
        response = self.client.delete(f'/comments/{self.comment.id}/')
        count = Comment.objects.count()
        self.assertEqual(count, 0)
        # basing status on the Post model delete function
        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT
            )