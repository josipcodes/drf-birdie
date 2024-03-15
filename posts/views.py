from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, generics, filters
from .models import Post
from .serializers import PostSerializer
from drf_api.permissions import IsOwnerOrReadOnly

# views were built based off of DRF_API lessons
class PostList(generics.ListCreateAPIView):
    """
    View all posts.
    Create a post if logged in.
    Permission already set globally in settings.py.
    """
    serializer_class = PostSerializer
    # queryset = Post.objects.all()
    queryset = Post.objects.annotate(
        comments_count=Count('comment', distinct=True),
        likes_count=Count('likes', distinct=True),
    ).order_by('-created')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]

    filterset_fields = [
        'owner__followed__owner__profile',
        'likes__owner__profile',
        'owner__profile',
    ]

    search_fields = [
        'owner__username',
        'content'
    ]

    ordering_fields = [
        'likes_count',
        'comments_count',
        'likes__created'
    ]


    def perform_create(self, serializer):
        """
        Post creation, associates owner with current user
        """
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post. Edit/delete if it is yours.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = PostSerializer
    # queryset = Post.objects.all()
    queryset = Post.objects.annotate(
        comments_count=Count('comment', distinct=True),
        likes_count=Count('likes', distinct=True),
    ).order_by('-created')
