from django.urls import path
from . import views

urlpatterns = [
    path('alimentos/', views.listar_alimentos, name='listar_alimentos'),
    path('alimentos/adicionar/', views.adicionar_alimento, name='adicionar_alimento'),
]
