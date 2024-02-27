# from django.http import Http404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer
from drf_api.permissions import isOwnerOrReadOnly
from rest_framework import generics

# views were built based off of DRF_API lessons, 
# but have been slightly modified before refactoring
class ProfileList(generics.ListAPIView):
    """
    List all profiles/create profile
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    # def get (self, request):
    #     all_profiles = Profile.objects.all()
    #     serializer = ProfileSerializer(
    #         all_profiles, 
    #         many=True,
    #         context={'request': request}
    #         )
    #     return Response(serializer.data)


class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [isOwnerOrReadOnly]
    queryset = Profile.objects.all()
    # def get_object(self, pk):
    #     """
    #     Function returns a profile or 404
    #     """
    #     try:
    #         profile = Profile.objects.get(pk=pk)
    #         # based off of https://www.django-rest-framework.org/api-guide/permissions/
    #         self.check_object_permissions(self.request, profile)
    #         return profile
    #     # signal specific profile does not exist
    #     except Profile.DoesNotExist:
    #         raise Http404

    # following two methods are copied from drf_api lessons
    # def get(self, request, pk):
    #     """
    #     Obtains profile based on primary key
    #     """
    #     profile = self.get_object(pk)
    #     serializer = ProfileSerializer(
    #         profile,
    #         context={'request': request}
    #         )
    #     return Response(serializer.data)

    # def put(self, request, pk):
    #     """
    #     Obtains profile based on primary key
    #     Updates profile or serves 400
    #     """
    #     profile = self.get_object(pk)
    #     serializer = ProfileSerializer(
    #         profile, 
    #         data=request.data,
    #         context={'request': request}
    #         )
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(
    #         serializer.errors, 
    #         status=status.HTTP_400_BAD_REQUEST
    #         )