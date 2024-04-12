from rest_framework import serializers
from django.contrib.humanize.templatetags.humanize import naturaltime
from .models import Comment

# serializers copied from drf_api lessons with minor modifications.
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
    created = serializers.SerializerMethodField()
    modified = serializers.SerializerMethodField()


    # Check if request.user is the same as it's owner.
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_created(self, obj):
        return naturaltime(obj.created)
    
    def get_modified(self, obj):
        return naturaltime(obj.modified)


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
