from django.shortcuts import render
from rest_framework import generics
from .models import MenuItem
from .serializers import MenuItemSerializer

class StarterList(generics.ListAPIView):
    queryset = MenuItem.objects.filter(section__name="Starters")
    serializer_class = MenuItemSerializer

