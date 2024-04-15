from rest_framework import serializers
from .models import Advertisement


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = [
            'id',
            'product',
            'description',
            'contract_start',
            'contract_end',
            'money',
            'image',
            'alt',
        ]
