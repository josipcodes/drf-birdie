from rest_framework import generics, permissions
from drf_api.permissions import isOwnerOrReadOnly
from .models import Like
from .serializers import LikeSerializer


class LikeList(generics.ListCreateAPIView):
    # permission classes set globally
    serializer_class = LikeSerializer
    queryset = Like.objects.all()


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)