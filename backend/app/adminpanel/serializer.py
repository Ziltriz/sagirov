# sitecore/serializers.py
from rest_framework import serializers
from .models import Advantage, MenuItem

class AdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advantage
        fields = ['id', 'title', 'value', 'subtitle', 'order', ]

class MenuItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuItem
        fields = ['id', 'title', 'url', 'order',]
    