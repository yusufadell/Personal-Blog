from .base import *


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ADMINS = (("y8l", "youseefadel777@gmail.com"),)

ALLOWED_HOSTS = ["blo2gy.herokuapp.com"]

DEFAULT_FROM_EMAIL = "youseefadel777@gmail.com"


SITE_ID = 1


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "blog",
        "USER": "blog",
        "PASSWORD": "ff",
    }
}


# E-mail
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "youseefadel777@gmail.com"
EMAIL_HOST_PASSWORD = ""
EMAIL_PORT = 587
EMAIL_USE_TLS = True


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Configure Django App for Heroku.
import django_heroku

django_heroku.settings(locals())
