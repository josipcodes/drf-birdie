from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from .models import SavedPost
from .serializers import SavedPostSerializer

# based off of Likes views
class SavedPostList(generics.ListCreateAPIView):
    """
    View all saved posts.
    Save a post if logged in.
    Permission already set globally in settings.py
    """
    serializer_class = SavedPostSerializer
    queryset = SavedPost.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SavedPostDetail(generics.RetrieveDestroyAPIView):
    # Retrieve/delete a saved post if it is your save.
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = SavedPostSerializer
    queryset = SavedPost.objects.all()
