from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GlicemiaViewSet, GlicemiaView, PressaoViewSet

router = DefaultRouter()
router.register(r'glicemia', GlicemiaViewSet, basename='glicemia')
router.register(r'pressao', PressaoViewSet, basename='pressao')

urlpatterns = [
    path('', include(router.urls)),
    
]
