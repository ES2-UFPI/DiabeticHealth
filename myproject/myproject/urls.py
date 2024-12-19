from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/food/", include("food_data.urls")),  # Inclui as URLs do app food_data
]
