from rest_framework import serializers
from .models import MenuItem, MenuSection, Note

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = "__all__"

class MenuNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

class MenuSectionSerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True)
    menu_notes = MenuNoteSerializer(many=True)
    class Meta:
        model = MenuSection
        fields = "__all__"
