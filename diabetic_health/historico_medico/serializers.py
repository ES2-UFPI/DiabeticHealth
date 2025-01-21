from rest_framework_mongoengine.serializers import DocumentSerializer
from .models import  Insulina, Pressao


class InsulinaSerializer(DocumentSerializer):
    class Meta:
        model = Insulina
        fields = '__all__'

class PressaoSerializer(DocumentSerializer):
    class Meta:
        model = Pressao
        fields = '__all__'