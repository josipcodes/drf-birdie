# status potentially unnecessary
from rest_framework import status, permissions, generics 
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
# is post detail needed?
from .serializers import PostSerializer
from drf_api.permissions import IsOwnerOrReadOnly


# views were built based off of DRF_API lessons, 
# but have been slightly modified
# class PostList(APIView):
#     """
#     View all posts
#     """
#     # post form
#     serializer_class = PostSerializer
#     # permission already set globally in settings.py
#     def get(self, request):
#         all_posts = Post.objects.all()
#         serializer = PostSerializer(
#             all_posts,
#             many=True,
#             context={'request': request}
#         )
#         return Response(serializer.data)

#     def post(self, request):
#         """
#         Creating a post
#         """
#         serializer = PostSerializer(
#             data=request.data,
#             context={'request': request}
#         )
#         if serializer.is_valid():
#             serializer.save(owner=request.user)
#             return Response(
#                 serializer.data, status=status.HTTP_201_CREATED
#             )
#         return Response(
#             serializer.errors, status=status.HTTP_400_BAD_REQUEST
#         )

class PostList(generics.ListCreateAPIView):
    """
    View all posts
    """
    # post form
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # permission already set globally in settings.py

    def perform_create(self, serializer):
        """
        Post creation
        """
        serializer.save(owner=self.request.user)


# class PostDetail(APIView):
#     permission_classes = [IsOwnerOrReadOnly]
#     serializer_class = PostSerializer


#     def get_object(self, pk):
#         """
#         Retrieving raw data and checking permissions
#         """
#         try:
#             post = Post.objects.get(pk=pk)
#             self.check_object_permissions(self.request, post)
#             return post
#         except Post.DoesNotExist:
#             raise Http404


#     def get(self, request, pk):
#         """
#         Get method applied to retrieve a post
#         """
#         post = self.get_object(pk)
#         # serializing data
#         serializer = PostSerializer(
#             post,
#             context={'request': request})
#         return Response(serializer.data)


#     def put(self, request, pk):
#         """
#         Update a post
#         """
#         post = self.get_object(pk)
#         serializer = PostSerializer(
#             post,
#             data=request.data,
#             context={'request': request}
#         )
#         # validating content
#         if serializer.is_valid():
#             # saving the updated post
#             serializer.save()
#             return Response(serializer.data)
#         # return error if not valid
#         return Response(
#             serializer.errors,
#             status=status.HTTP_400_BAD_REQUEST
#         )


    # def delete(self, request, pk):
    #     """
    #     Delete a post
    #     """
    #     # obtaining the specific post based on pk
    #     post = self.get_object(pk)
    #     # deleting the post
    #     post.delete()
    #     return Response(
    #         status=status.HTTP_204_NO_CONTENT
    #     )

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
