from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .services import get_food_data


@csrf_exempt  # Desativa a verificação CSRF para requisições externas
def food_search(request):
    # Verifica se o parâmetro de consulta foi enviado
    query = request.GET.get("query", "").strip()

    if not query:
        return JsonResponse(
            {"error": "Por favor, forneça um termo de pesquisa."}, status=400
        )

    # Chama a função que consulta a API externa
    food_data = get_food_data(query)

    # Verifica se a API retornou algum resultado e o tipo de dado retornado
    if food_data:
        # Retorna o dado como JSON, definindo safe=False caso o resultado não seja um dicionário
        return JsonResponse(food_data, safe=isinstance(food_data, dict))
    else:
        return JsonResponse({"error": "Alimento não encontrado."}, status=404)
