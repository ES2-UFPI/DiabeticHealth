from django.db import models

class Alimento(models.Model):
    nome = models.CharField(max_length=100)
    calorias = models.FloatField(null=True, blank=True)
    carboidratos = models.FloatField(null=True, blank=True)
    proteinas = models.FloatField(null=True, blank=True)
    gorduras = models.FloatField(null=True, blank=True)
    categoria = models.CharField(max_length=50, null=True, blank=True)
    indice_glicemico = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.nome
