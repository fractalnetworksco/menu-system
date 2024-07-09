from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import MenuSection
from .serializers import MenuSectionSerializer

class MenuView(ModelViewSet):
    queryset = MenuSection.objects.all()
    serializer_class = MenuSectionSerializer

