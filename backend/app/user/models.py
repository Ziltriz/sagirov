import binascii
import os
from django.utils.translation import gettext_lazy as _
from email.policy import default
from random import choices
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from app.images.models import Image
from app.geo.models import Country
from django.conf import settings
from django.db.models.signals import post_save
from utils.function import hash
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Генерация токена для API для созданного пользователя


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# Менеджер для пользователя


class UserManager(BaseUserManager):
    def create_user(self, login, password=None, **extra_fields):
        if not login:
            raise ValueError('У пользователей должен присутствовать login')

        user = self.model(login=login)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, login, password, **extra_fields):
        user = self.create_user(login=login, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

    def get_by_natural_key(self, username):
        return self.get(**{'%s__iexact' % self.model.USERNAME_FIELD: username})

# Модель пользователей сайта


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_ADMIN = 'admin'
    ROLE_VIEWER = 'viewer'
    ROLE_MANAGER = 'manager'

    ROLE_LIST = (
        (ROLE_ADMIN, "Админ"),
        (ROLE_VIEWER, "Пользователь"),
        (ROLE_MANAGER, "Менеджер"),
    )
    login = models.CharField(verbose_name="Логин", unique=True, max_length=255)
    email = models.EmailField(
        verbose_name="Email", unique=True, blank=True, null=True, max_length=255)
    phone = models.CharField(verbose_name="Телефон",
                             unique=True, blank=True, null=True, max_length=25)
    username = models.CharField(
        verbose_name="Имя", blank=True, null=True, max_length=255)
    surname = models.CharField(
        verbose_name="Фамилия", blank=True, null=True, max_length=255)
    lastname = models.CharField(
        verbose_name="Отчество", blank=True, null=True, max_length=255)
    birthday = models.DateField(
        verbose_name="Дата рождения", blank=True, null=True)
    role = models.CharField(verbose_name="Роль пользователя",
                            default="viewer", choices=ROLE_LIST, max_length=255)

    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True, null=False)
    is_staff = models.BooleanField(default=False, null=False)
    is_email_validated = models.BooleanField(default=False, null=False)

    activation_key = models.CharField(max_length=40, blank=True, null=True)

    recovery_key = models.CharField(max_length=40, blank=True, null=True)
    smscode = models.CharField(max_length=40, blank=True, null=True)

    USERNAME_FIELD = 'login'

    objects = UserManager()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f"{self.email} {self.phone}"

    def get_name_info(self):
        result = ''

        if self.surname or self.username or self.lastname:
            if self.surname:
                result += f"{self.surname} "

            if self.username:
                result += f"{self.username} "

            if self.lastname:
                result += f"{self.lastname} "

        return result