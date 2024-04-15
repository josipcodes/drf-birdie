from django.db import IntegrityError
from rest_framework import serializers
from .models import Follower


# copied from drf_api lessons with minor changes
class FollowerSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(
        source='owner.username'
        )
    followed_name = serializers.ReadOnlyField(
        source='followed.username'
        )

    class Meta:
        model = Follower
        fields = [
            'id',
            'owner',
            'followed_name',
            'followed',
            'created',
        ]

    def create(self, validated_data):
        # Follower validation
        try:
            # calling super() as create method is on the ModelSerializer
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'likely duplicate'
            })
