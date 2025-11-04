# sitecore/urls.py
from rest_framework import routers
from .views import AdvantageViewSet, MenuItemViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'advantages', AdvantageViewSet, basename='advantage')
router.register(r'menu-items', MenuItemViewSet, basename='menuitem')

urlpatterns = [
    path('api/', include(router.urls)),
]