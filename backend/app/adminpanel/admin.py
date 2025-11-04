from django.contrib import admin
from .models import Advantage, MenuItem

@admin.register(Advantage)
class AdvantageAdmin(admin.ModelAdmin):
    list_display = ('value', 'title', 'subtitle', 'order')
    list_editable = ['order']
    search_fields = ('title', 'value', 'subtitle')
    ordering = ('order',)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'url',  'order', )
    list_editable = ['order']
    search_fields = ('title', 'url')
    ordering = ('order',)