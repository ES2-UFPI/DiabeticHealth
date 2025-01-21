from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GlicemiaViewSet, GlicemiaView

router = DefaultRouter()
router.register(r'glicemia', GlicemiaViewSet, basename='glicemia')

urlpatterns = [
    path('', include(router.urls)),
    path('glicemia_client/', GlicemiaView.as_view(), name='glicemia'),
]
