from django.db import models

class MedicalHistory(models.Model):
    patient_name = models.CharField(max_length=255)
    patient_cpf = models.CharField(max_length=255)
    patient_email = models.EmailField()
    patient_age = models.IntegerField(max_length=255)
    file = models.FileField(upload_to='medical_records/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

