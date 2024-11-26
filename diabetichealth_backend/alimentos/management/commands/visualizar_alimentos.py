import requests
from django.core.management.base import BaseCommand

FDC_API_KEY = 'WAW1vgb0Va9gbIgA9whfWLoiIiobNnSsgZtMC0U8'  # Substitua pela sua chave de API

class Command(BaseCommand):
    help = 'Lista alimentos comuns retornados pela API da FoodData Central'

    def handle(self, *args, **kwargs):
        base_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
        headers = {'Content-Type': 'application/json'}
        termos_comuns = ['apple', 'banana', 'bread', 'milk', 'rice', 'chicken', 'egg', 'cheese', 'tomato', 'potato']
        alimentos_exibidos = 0
        max_alimentos = 100  # Número máximo de alimentos a serem exibidos

        for termo in termos_comuns:
            if alimentos_exibidos >= max_alimentos:
                break

            params = {
                'api_key': FDC_API_KEY,
                'query': termo,
                'pageSize': 10,  # Número de resultados por termo
                'pageNumber': 1
            }
            response = requests.get(base_url, headers=headers, params=params)
            
            # Verifique se a requisição foi bem-sucedida
            if response.status_code != 200:
                self.stderr.write(f"Erro na requisição para '{termo}': {response.status_code} - {response.text}")
                continue
            
            resultados = response.json().get('foods', [])
            
            if not resultados:
                self.stdout.write(f"Nenhum alimento encontrado para o termo: {termo}")
                continue
            
            for alimento in resultados:
                if alimentos_exibidos >= max_alimentos:
                    break

                descricao = alimento.get('description', 'Sem Nome')
                categoria = alimento.get('dataType', 'Sem Categoria')
                nutrientes = alimento.get('foodNutrients', [])
                
                # Mostre os primeiros 3 nutrientes para manter o log limpo
                nutrientes_resumo = ", ".join(
                    f"{n['nutrientName']}: {n['value']} {n['unitName']}" 
                    for n in nutrientes[:3]
                )

                self.stdout.write(
                    f"{alimentos_exibidos + 1}. Nome: {descricao}\n"
                    f"   Categoria: {categoria}\n"
                    f"   Nutrientes: {nutrientes_resumo or 'Nenhum nutriente disponível'}"
                )
                
                alimentos_exibidos += 1
