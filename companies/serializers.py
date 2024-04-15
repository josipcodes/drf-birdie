from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = [
            'id',
            'company_name',
            'internal_notes',
        ]
