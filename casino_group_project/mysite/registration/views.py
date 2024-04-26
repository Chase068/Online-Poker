from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login
from blackjack.models import PlayerWins

# Create your views here.


def registrationHome(request):
    return render(request, "registration/index.html")


def signup(request):

    if request.method == "POST":
        username = request.POST.get('username')
        pass1 = request.POST.get('pass1')
        pass2 = request.POST.get('pass2')

        myuser = User.objects.create_user(username, None, pass1)
        myuser.save()

        winTracker = PlayerWins(username=username, wins=0)
        winTracker.save()

        messages.success(request, "Account Created!")

        return redirect('login')


    return render(request, "registration/signup.html")

def signin(request):

    if request.method == "POST":
        username = request.POST.get('username')
        pass1 = request.POST.get('pass1')

        user = authenticate(username=username, password=pass1)

        if user is not None:
            login(request, user)
            return render(request, "registration/index.html", {'username' : username})

        else:
            messages.error(request, "Wrong Username or Password")

    return render(request, "registration/login.html")


