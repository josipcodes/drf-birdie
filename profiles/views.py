from .models import Profile
from .serializers import ProfileSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from rest_framework import generics

# views were built based off of DRF_API lessons, 
# but have been slightly modified before refactoring
class ProfileList(generics.ListAPIView):
    """
    List all profiles/create profile.
    Permission already set globally in settings.py
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve a profile. Edit if it is yours.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()