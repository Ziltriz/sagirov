# sitecore/models.py
from django.db import models

class Advantage(models.Model):
    """
    Элемент блока преимуществ (то что отображается на главной: 'мы', '1', 'на рынке' и т.д.)
    """
    title = models.CharField(max_length=200, blank=True, help_text="Например 'мы' или 'гарантируем'")
    value = models.CharField(max_length=200, help_text="Основная цифра/процент/текст, например '50%' или '1'") 
    subtitle = models.CharField(max_length=200, blank=True, help_text="Нижняя строка, например 'на рынке' или 'безопасность'")
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Преимущество"
        verbose_name_plural = "Преимущества"

    def __str__(self):
        return f"{self.value} — {self.title or self.subtitle}"

class MenuItem(models.Model):
    """
    Пункт главного меню. Поддерживается вложенность (parent) и порядок.
    """
    title = models.CharField(max_length=200)
    url = models.CharField(max_length=500, blank=True, help_text="URL или internal path")
    order = models.PositiveIntegerField(default=0, db_index=True)

    class Meta:
        ordering = ['order']
        verbose_name = "Пункт меню"
        verbose_name_plural = "Пункты меню"

    def __str__(self):
        return self.title