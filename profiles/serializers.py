from rest_framework import serializers
from .models import Profile
from followers.models import Follower
from saved_posts.models import SavedPost


# most of the Serializer has been copied from drf_api lessons
# some alternations made, validation of avatar added
class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    posts_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    saved_count = serializers.ReadOnlyField()

    def validate_avatar(self, value):
        # 2MB
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Avatar size larger than 2MB!'
            )
        if value.image.width > 2048:
            raise serializers.ValidationError(
                'Avatar width larger than 2048px!'
            )
        if value.image.height > 2048:
            raise serializers.ValidationError(
                'Avatar height larger than 2048px!'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return obj.owner == request.user

    def get_following_id(self, obj):
        # Check if user follows another user
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follower.objects.filter(
                owner=user, followed=obj.owner
            ).first()
            return following.id if following else None
        return None

    class Meta:
        model = Profile
        fields = [
            'id',
            'owner',
            'bio',
            'name',
            'created',
            'modified',
            'avatar',
            'is_owner',
            'following_id',
            'posts_count',
            'followers_count',
            'following_count',
            'saved_count'
        ]
