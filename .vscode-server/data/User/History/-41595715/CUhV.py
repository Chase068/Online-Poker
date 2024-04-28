from django.shortcuts import render

def blackjack(request):
    return render(request, 'blackjack.html')

def index(request):
    return render(request, 'blackjack/index.html')

def play(request):
    # Implement game logic here
    return render(request, 'blackjack/play.html', {'message': 'Game in progress...'})
