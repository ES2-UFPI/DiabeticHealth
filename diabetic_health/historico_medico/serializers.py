from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import  Glicemia


class GlicemiaSerializer(DocumentSerializer):
    class Meta:
        model = Glicemia
        fields = '__all__'
