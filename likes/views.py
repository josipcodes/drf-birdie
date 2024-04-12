from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Like
from .serializers import LikeSerializer

# views copied from drf_api lessons, minor modifications
class LikeList(generics.ListCreateAPIView):
    """
    View all likes.
    Like a post if logged in.
    Permission already set globally in settings.py
    """
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

    def perform_create(self, serializer):
        # Like creation, associates owner with current user
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    # Retrieve a like. Delete if it is yours.
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
