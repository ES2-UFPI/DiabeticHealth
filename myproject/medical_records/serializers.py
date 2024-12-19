from rest_framework import serializers
from .models import MedicalHistory

class MedicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalHistory
        fields = ['id', 'patient_name', 'file', 'uploaded_at']
