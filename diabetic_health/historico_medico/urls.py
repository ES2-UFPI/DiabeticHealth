from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InsulinaViewSet, InsulinaView, PressaoViewSet

router = DefaultRouter()
router.register(r'insulina', InsulinaViewSet, basename='insulina')
router.register(r'pressao', PressaoViewSet, basename='pressao')

urlpatterns = [
    path('', include(router.urls)),
    
]