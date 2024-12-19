from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages


def login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        # Autentica o usuário
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Faz o login
            login(request, user)
            messages.success(request, "Login realizado com sucesso!")
            return redirect("home")  # Substitua 'home' pelo nome da sua rota principal
        else:
            # Adiciona uma mensagem de erro
            messages.error(request, "Credenciais inválidas. Tente novamente.")

    return render(request, "login.html")  # Renderiza o formulário de login
