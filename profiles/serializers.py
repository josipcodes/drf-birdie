from rest_framework import serializers
from .models import Profile

# most of the Serializer has been copied from drf_api lessons
# some alternations made, validation of avatar added
class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    # read-only field, gets value from get_is_owner
    is_owner = serializers.SerializerMethodField()

    def validate_avatar(self, values):
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
            'is_owner'
        ]