from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Alimento
from .serializers import AlimentoSerializer

@api_view(['GET'])
def listar_alimentos(request):
    alimentos = Alimento.objects.all()
    serializer = AlimentoSerializer(alimentos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def adicionar_alimento(request):
    serializer = AlimentoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
