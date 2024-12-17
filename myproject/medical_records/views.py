from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import MedicalHistory
from .serializers import MedicalHistorySerializer

class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = MedicalHistorySerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response({"message": "File uploaded successfully!", "data": file_serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
