from blog.sitemaps import PostSitemap

from django.contrib.sitemaps.views import sitemap

from django.contrib import admin
from django.urls import path, include

from . import views


sitemaps = {"posts": PostSitemap}
urlpatterns = [
    path("admin/", admin.site.urls),
    # cards in website index
    path("", views.index),
    path("blog/", include("blog.urls", namespace="blog")),
    path(
        "sitemap.xml",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
]
