from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import File, Glicemia

class FileSerializer(DocumentSerializer):
    class Meta:
        model = File
        fields = '__all__'

class GlicemiaSerializer(DocumentSerializer):
    class Meta:
        model = Glicemia
        fields = '__all__'
