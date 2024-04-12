from rest_framework import serializers
from .models import SavedPost

# based on Like serializers
class SavedPostSerializer(serializers.ModelSerializer):
    """
    Serializer for the SavedPost model.
    The create method handles the unique constraint on 'owner' and 'post'
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = SavedPost
        fields = [
            'id',
            'created',
            'owner',
            'post'
        ]

    def create(self, validated_data):
        """
        SavedPost validation.
        The create method handles the unique constraint on 'owner' and 'post'.
        """
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
