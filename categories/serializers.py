from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()

    # below function appropriated from:
    # https://stackoverflow.com/questions/32443471/
    # django-show-the-count-of-related-objects-in-admin-list-display
    def get_posts_count(self, obj):
        return obj.post_set.count()

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'description',
            'posts_count'
        ]
