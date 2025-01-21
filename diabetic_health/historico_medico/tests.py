from django.test import TestCase
from rest_framework.test import APIClient
from .models import Insulina, Pressao

class HealthDataTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_insulina(self):
        data = {
            "date": "2023-10-01T12:00:00",
            "value": 100
        }
        quant = Insulina.objects.count()
        response = self.client.post('/dados/insulina/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Insulina.objects.count(), quant + 1)
        insulina = Insulina.objects.order_by('-id').first()
        self.assertEqual(insulina.value, 100)

    def test_create_pressao(self):
        data = {
            "date": "2023-10-01T08:00:00",
            "momento": "morning",
            "systolic": 120,
            "diastolic": 80,
            "pulso": 70
        }
        quant = Pressao.objects.count()
        response = self.client.post('/dados/pressao/', data, format='json')
        print(response.status_code)  # Verificar o código de status
        print(response.data)   
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Pressao.objects.count(), quant + 1)
        pressao = Pressao.objects.order_by('-id').first()
        self.assertEqual(pressao.momento, "morning")
        self.assertEqual(pressao.systolic, 120)
        self.assertEqual(pressao.diastolic, 80)
        self.assertEqual(pressao.pulso, 70)