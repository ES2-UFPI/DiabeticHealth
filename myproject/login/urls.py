from django.urls import path
from . import views  # Importa as views do seu app

urlpatterns = [
    path("login/", views.login_view, name="login"),
]
