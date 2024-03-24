from rest_framework import serializers
from .models import Post
from likes.models import Like
# from categories.serializers import CategorySerializer

# most of the Serializer has been copied from drf_api lessons
# some alternations made
class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_avatar = serializers.ReadOnlyField(source='owner.profile.avatar.url')
    like_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    likes_count = serializers.ReadOnlyField()

    # category = CategorySerializer()

    def validate_image(self, value):
        # 2MB
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 2048:
            raise serializers.ValidationError(
                'Image width larger than 2048px!'
            )
        if value.image.height > 2048:
            raise serializers.ValidationError(
                'Image height larger than 2048px!'
            )
        return value

    # Appropriated functions from drf_api comment lessons
    # Tbd if it will be used
    def get_created(self, obj):
        """
        Returns a string representing time since creation
        """
        return naturaltime(obj.created)

    def get_modified(self, obj):
        """
        Returns a string representing time since modifying
        """
        return naturaltime(obj.modified)

    def get_is_owner(self, obj):
        request = self.context['request']
        return obj.owner == request.user

    def get_like_id(self, obj):
        """
        Check if user liked the post
        """
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

    class Meta:
        model = Post
        fields = [
            'id',
            'owner',
            'content',
            'created',
            'modified',
            'image',
            'category',
            'is_owner',
            'profile_id',
            'profile_avatar',
            'like_id',
            'comments_count',
            'likes_count'
        ]