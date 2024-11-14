import requests
from django.conf import settings


def get_food_data(query):
    api_key = settings.FDC_API_KEY  # Certifique-se de que sua chave está no settings.py
    url = "https://api.nal.usda.gov/fdc/v1/foods/list"  # A URL que funciona no cURL

    params = {
        "dataType": "Foundation,SR Legacy",  # Tipo de dados, igual ao comando curl
        "pageSize": 25,  # Número de itens por página
        "pageNumber": 2,  # Página dos resultados
        "api_key": api_key,  # A chave de API que você está utilizando
    }

    headers = {
        "accept": "application/json",  # Tipo de resposta esperada
    }

    try:
        # Fazendo a requisição GET
        response = requests.get(url, params=params, headers=headers)

        # Verificando se a requisição foi bem-sucedida
        response.raise_for_status()  # Vai levantar um erro se o status não for 200 (OK)

        # Se a requisição for bem-sucedida, processa os dados
        data = response.json()
        return data  # Retorna os dados recebidos

    except requests.exceptions.RequestException as e:
        # Se houver algum erro na requisição, captura a exceção e exibe a mensagem
        print(f"Erro na requisição: {e}")
        return None
