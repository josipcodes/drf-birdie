from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from .models import SavedPost
from .serializers import SavedPostSerializer

# based off of Likes views
class SavedPostList(generics.ListCreateAPIView):
    # permission classes set globally
    # tbd if permission needs updating
    serializer_class = SavedPostSerializer
    queryset = SavedPost.objects.all()


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SavedPostDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = SavedPostSerializer
    queryset = SavedPost.objects.all()
