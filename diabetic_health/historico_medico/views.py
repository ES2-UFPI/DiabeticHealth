from rest_framework_mongoengine.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import File, Glicemia
from .serializers import FileSerializer, GlicemiaSerializer
from datetime import datetime

class FileViewSet(ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

class GlicemiaViewSet(ModelViewSet):
    queryset = Glicemia.objects.all()
    serializer_class = GlicemiaSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

class GlicemiaView(APIView):
    def post(self, request):
        date = request.data.get('date')
        value = request.data.get('value')
        
        if not date or not value:
            return Response({"error": "Date and value are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        glicemia = Glicemia(date=datetime.strptime(date, '%Y-%m-%dT%H:%M:%S'), value=value)
        glicemia.save()
        
        return Response({"message": "Data saved successfully."}, status=status.HTTP_201_CREATED)