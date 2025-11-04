# sitecore/views.py
from rest_framework import viewsets, permissions
from .models import Advantage, MenuItem
from .serializer import AdvantageSerializer, MenuItemSerializer

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Разрешаем запись только админам, чтение — всем.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff

class AdvantageViewSet(viewsets.ModelViewSet):
    queryset = Advantage.objects.all().order_by('order')
    serializer_class = AdvantageSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        qs = Advantage.objects.all().order_by('order')
        return qs

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all().order_by('order')
    serializer_class = MenuItemSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        qs = MenuItem.objects.all().order_by('order')
        if self.request.user and self.request.user.is_staff:
            qs = MenuItem.objects.all().order_by('order')
        return qs