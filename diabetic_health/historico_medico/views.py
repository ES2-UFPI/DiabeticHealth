from rest_framework_mongoengine.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Insulina, Pressao
from .serializers import InsulinaSerializer, PressaoSerializer
from datetime import datetime



class InsulinaViewSet(ModelViewSet):
    queryset = Insulina.objects.all()
    serializer_class = InsulinaSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

class InsulinaView(APIView):
    def post(self, request):
        date = request.data.get('date')
        value = request.data.get('value')
        
        if not date or not value:
            return Response({"error": "Date and value are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        Insulina = Insulina(date=datetime.strptime(date, '%Y-%m-%dT%H:%M:%S'), value=value)
        Insulina.save()
        
        return Response({"message": "Data saved successfully."}, status=status.HTTP_201_CREATED)
    
class PressaoView(APIView):
    def post(self, request):
        momento = request.data.get('momento')
        systolic = request.data.get('systolic')
        diastolic = request.data.get('diastolic')
        pulso = request.data.get('pulso')

        if not momento or not systolic or not diastolic or not pulso:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Criar e salvar a pressão arterial
        pressao = Pressao(
            momento=momento,
            systolic=systolic,
            diastolic=diastolic,
            pulso=pulso
        )
        pressao.save()

        return Response({"message": "Data saved successfully."}, status=status.HTTP_201_CREATED)
    
class PressaoViewSet(ModelViewSet):
    queryset = Pressao.objects.all()
    serializer_class = PressaoSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]