import random
from django.core.management.base import BaseCommand
from alimentos.models import Alimento
import requests
from googletrans import Translator

FDC_API_KEY = 'WAW1vgb0Va9gbIgA9whfWLoiIiobNnSsgZtMC0U8'  # Substitua pela sua chave de API

class Command(BaseCommand):
    help = 'Popula o banco com dados da FoodData Central API'

    def handle(self, *args, **kwargs):
        translator = Translator()
        url = f"https://api.nal.usda.gov/fdc/v1/foods/list?api_key={FDC_API_KEY}"
        response = requests.get(url)
        response.raise_for_status()  # Verifica se a requisição foi bem-sucedida

        alimentos_data = response.json()  # Converte a resposta em JSON

        for alimento in alimentos_data[:50]:  # Exemplo com os primeiros 50 alimentos
            try:
                # Filtrar por `dataType` para excluir entradas irrelevantes
                if alimento.get('dataType') not in ['Survey (FNDDS)', 'SR Legacy']:
                    self.stdout.write(f"Ignorando entrada irrelevante: {alimento.get('description')}")
                    continue

                # Verificar se o item possui nutrientes
                if not alimento.get('foodNutrients'):
                    self.stdout.write(f"Ignorando entrada sem nutrientes: {alimento.get('description')}")
                    continue

                # Pegue o nome e traduza
                nome = alimento.get('description', 'Sem Nome')
                nome_pt = translator.translate(nome, src='en', dest='pt').text

                # Extraia os nutrientes necessários, garantindo que existem
                calorias = next(
                    (nutriente['amount'] for nutriente in alimento.get('foodNutrients', [])
                     if nutriente.get('name') == 'Energy' and nutriente.get('unitName') == 'KCAL'),
                    0  # Valor padrão caso não encontre
                )
                carboidratos = next(
                    (nutriente['amount'] for nutriente in alimento.get('foodNutrients', [])
                     if nutriente.get('name') == 'Carbohydrate, by difference'),
                    0
                )
                proteinas = next(
                    (nutriente['amount'] for nutriente in alimento.get('foodNutrients', [])
                     if nutriente.get('name') == 'Protein'),
                    0
                )
                gorduras = next(
                    (nutriente['amount'] for nutriente in alimento.get('foodNutrients', [])
                     if nutriente.get('name') == 'Total lipid (fat)'),
                    0
                )

                # Salve o alimento no banco de dados
                Alimento.objects.create(
                    nome=nome_pt,
                    calorias=calorias,
                    carboidratos=carboidratos,
                    proteinas=proteinas,
                    gorduras=gorduras,
                    categoria=alimento.get('dataType', 'Sem Categoria'),
                )
                self.stdout.write(f"Alimento adicionado: {nome_pt}")
            except Exception as e:
                self.stderr.write(f"Erro ao processar o alimento '{alimento.get('description', 'Desconhecido')}': {e}")

        self.stdout.write("Banco de dados populado com sucesso!")
