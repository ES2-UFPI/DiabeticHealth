from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import  Glicemia, Pressao


class GlicemiaSerializer(DocumentSerializer):
    class Meta:
        model = Glicemia
        fields = '__all__'

class PressaoSerializer(DocumentSerializer):
    class Meta:
        model = Pressao
        fields = '__all__'