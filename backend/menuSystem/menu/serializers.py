from rest_framework import serializers
from .models import MenuItem, MenuSection

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = "__all__"

class MenuSectionSerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True)
    class Meta:
        model = MenuSection
        fields = "__all__"