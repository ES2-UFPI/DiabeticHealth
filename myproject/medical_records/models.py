from django.db import models
from django.core.validators import RegexValidator, MinValueValidator

class MedicalHistory(models.Model):
    patient_name = models.CharField("Nome do Paciente", max_length=255)
    patient_cpf = models.CharField(
        "CPF do Paciente",
        max_length=11,
        validators=[
            RegexValidator(
                regex=r"^\d{11}$",
                message="O CPF deve conter exatamente 11 dígitos numéricos."
            )
        ]
    )
    patient_email = models.EmailField("Email do Paciente")
    patient_age = models.PositiveIntegerField(
        "Idade do Paciente",
        validators=[MinValueValidator(0, "A idade não pode ser negativa.")]
    )
    file = models.FileField("Arquivo Médico", upload_to='medical_records/%Y/%m/%d/')
    uploaded_at = models.DateTimeField("Data de Upload", auto_now_add=True)

    class Meta:
        verbose_name = "Histórico Médico"
        verbose_name_plural = "Históricos Médicos"
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.patient_name} - {self.patient_cpf}"
