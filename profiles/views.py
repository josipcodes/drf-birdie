from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from .models import Profile
from .serializers import ProfileSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from rest_framework import generics, filters

# views were built based off of DRF_API lessons, 
# but have been slightly modified before refactoring
class ProfileList(generics.ListAPIView):
    """
    List all profiles/create profile.
    Permission already set globally in settings.py
    """
    queryset = Profile.objects.annotate(
        # without  distinct, we would get duplicates
        posts_count=Count('owner__post', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True),
        saved_count=Count('owner__post__saved', distinct=True),
    ).order_by('created')
    serializer_class = ProfileSerializer
    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__following__followed__profile'
    ]

    ordering_fields = [
        'posts_count',
        'followers_count',
        'following_count',
        'owner__following__created',
        'owner__followed__created'
    ]


class ProfileDetail(generics.RetrieveUpdateAPIView):
    # Retrieve a profile. Edit if it is yours.
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        posts_count=Count('owner__post', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True),
        saved_count=Count('owner__post__saved', distinct=True),
    ).order_by('created')