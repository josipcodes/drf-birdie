from rest_framework import serializers
from .models import Comment

# serializers copied from drf_api lessons.
class CommentSerializer(serializers.ModelSerializer):
    """
    SerializerMethodField is read only. 
    It gets its value by calling the method with a name get_fieldname.
    """
    owner = serializers.ReadOnlyField(
        source='owner.username'
        )
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(
        source='owner.profile.id'
        )
    profile_avatar = serializers.ReadOnlyField(
        source='owner.profile.avatar.url'
        )


    """
    We need to check if request.user is the same as it's owner.
    Problem, currently logged in user is a part of the request.
    To resolve this, we need to pass it via context in views.py.
    This needs to happen whenever we call Serializer.
    """
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner


    class Meta:
        model = Comment
        fields = [
            'id',
            'owner',
            'post',
            'created',
            'modified',
            'content',
            'is_owner',
            'profile_id',
            'profile_avatar'
        ]


class CommentDetailSerializer(CommentSerializer):
    """
    Serializer for the Comment model used in Detail view
    Post is a read only field so that we dont have to set it on each update
    """
    post = serializers.ReadOnlyField(source='post.id')
