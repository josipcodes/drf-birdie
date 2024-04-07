from rest_framework import serializers
from .models import Advertisement
# from django.utils import timezone
# from datetime import date

class AdvertisementSerializer(serializers.ModelSerializer):
    # is_currently_valid = serializers.SerializerMethodField()

    # def get_is_currently_valid(self, obj):
    #     today = date.today()
    #     return obj.contract_start.date() <= today <= obj.contract_end.date()

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
            # 'is_currently_valid'
        ]

