from rest_framework import generics, serializers
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Follower
from .serializers import FollowerSerializer


# views are based on drf_api with added improvements
class FollowerList(generics.ListCreateAPIView):
    """
    List all followers, i.e. all instances of a user
    following another user'.
    Create a follower, i.e. follow a user if logged in.
    Permission already set globally in settings.py.
    """
    serializer_class = FollowerSerializer
    queryset = Follower.objects.all()

    def perform_create(self, serializer):
        """
        Perform_create: associate the current
        logged in user with a follower.
        """
        owner = self.request.user
        followed = serializer.validated_data['followed']
        # raise error if owner tries following themselves
        if owner == followed:
            raise serializers.ValidationError(
                "This is your profile, you cannot follow it."
                )
        serializer.save(owner=owner)


class FollowerDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a follower
    No Update view, as we either follow or unfollow users
    Destroy a follower, i.e. unfollow someone if owner
    """
    serializer_class = FollowerSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Follower.objects.all()
