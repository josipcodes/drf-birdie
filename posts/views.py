from rest_framework import permissions, generics 
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
    queryset = Post.objects.all()

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
    queryset = Post.objects.all()
