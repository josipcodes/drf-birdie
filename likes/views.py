from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Like
from .serializers import LikeSerializer

# views copied from drf_api lessons, minor modifications
class LikeList(generics.ListCreateAPIView):
    # permission classes set globally
    serializer_class = LikeSerializer
    queryset = Like.objects.all()


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
