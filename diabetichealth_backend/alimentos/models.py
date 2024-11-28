from django.db import models

class Alimento(models.Model):
    nome = models.CharField(max_length=255)
    medida_usual = models.CharField(max_length=255)
    g_ou_ml = models.FloatField()
    carboidratos = models.FloatField()  # cho (g)
    calorias = models.FloatField()  # calorias (kcal)

    def __str__(self):
        return self.nome
