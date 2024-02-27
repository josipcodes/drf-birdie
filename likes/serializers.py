from rest_framework import serializers
from .models import Like

# copied from drf_api lessons with  minor modifications
class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model.
    The create method handles the unique constraint on 'owner' and 'post'
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Like
        fields = [
            'id',
            'created',
            'owner',
            'post'
        ]

    def create(self, validated_data):
        """
        Like validation.
        The create method handles the unique constraint on 'owner' and 'post'.
        """
        try:
            # we call super() as create method is on the ModelSerializer
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
