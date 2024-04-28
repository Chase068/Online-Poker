from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import login
from .models import GameRoom
import random
from django.contrib.auth import logout as auth_logout


def logout(request):
    auth_logout(request)
    return redirect('index')  # Redirect to the index page after logging out

@login_required
def lobby(request):
    available_rooms = GameRoom.objects.all()
    context = {'available_rooms': available_rooms}
    return render(request, 'blackjack/lobby.html', context)

@login_required
def create_room(request):
    if request.method == 'POST':
        room_name = request.POST.get('room_name')
        room = GameRoom.objects.create(name=room_name, host=request.user)
        room.players.add(request.user)
        return redirect('lobby')
    return render(request, 'blackjack/create_room.html')

@login_required
def join_room(request, room_id):
    room = GameRoom.objects.get(id=room_id)
    room.players.add(request.user)
    return redirect('lobby')

# Define card ranks and suits
ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
suits = ['♠', '♥', '♦', '♣']

# Define a dictionary to map card ranks to values
card_values = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11  # Ace can be 11 or 1
}

#Constructing:)-----------------------

# Define a wallet function(which is betting) before starting game
def showWallet(wallet):
	print("\nWallet: $", wallet , "\n")

def showTip():
	print("\n----[Useful Tip]----")
	print("\nTo go back at the main menu at any given time, press the right shift key.")

def betCheck(wallet, bet):

	if bet == 0:
		main_menu(wallet)

	if wallet == 0:
		print("Sorry! Not enough funds!")
		time.sleep(3)
		main_menu(wallet)

	if bet > wallet:
		print("Not enough funds for that bet!")
		time.sleep(1.4)
		main_menu(wallet)

#Constructing:)-----------------


# Function to deal a card
def deal_card():
    return random.choice(ranks) + random.choice(suits)


# Function to calculate hand value
def calculate_hand_value(hand):
    total_value = 0
    num_aces = 0
    for card in hand:
        rank = card[:-1]
        total_value += card_values[rank]
        if rank == 'A':
            num_aces += 1
    # Adjust for aces if the total value exceeds 21
    while total_value > 21 and num_aces:
        total_value -= 10  # Subtract 10 to treat Ace as 1 instead of 11
        num_aces -= 1
    return total_value

def index(request):
    if request.user.is_authenticated:
        return redirect('play')
    return render(request, 'blackjack/index.html')

def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        # Create a new user
        user = User.objects.create_user(username=username, password=password)
        # Log in the user
        login(request, user)
        return redirect('play')  # Redirect to the play page after registration
    return render(request, 'blackjack/register.html')


@login_required
def play(request):
    # Print session data before initializing player and dealer hands
    print("Session before initialization:", request.session)

    # Initialize player session data if not already present
    if 'player_hand' not in request.session:
        request.session['player_hand'] = []
        request.session['dealer_hand'] = []
        request.session['bet_amount'] = 0  # Add a placeholder for bet amount

    # Print session data after initializing player and dealer hands
    print("Player hand before dealing:", request.session.get('player_hand'))
    print("Dealer hand before dealing:", request.session.get('dealer_hand'))

    # Initialize message variable
    message = ''

    if request.method == 'POST' and 'new_game' in request.POST:
        # Reset session variables for a new game
        request.session['player_hand'] = []
        request.session['dealer_hand'] = []
        request.session['bet_amount'] = 0
        return redirect('play')  # Redirect to the same page to start a new game

    if not request.session['player_hand']:
        # Deal initial hands if not already dealt
        player_hand = [deal_card(), deal_card()]
        dealer_hand = [deal_card(), '???']  # One card face up, one face down
        request.session['player_hand'] = player_hand
        request.session['dealer_hand'] = dealer_hand
    else:
        player_hand = request.session['player_hand']
        dealer_hand = request.session['dealer_hand']

        # Game logic: Handle player actions (hit or stand)
        if request.method == 'POST':
            action = request.POST.get('action')
            if action == 'hit':
                new_card = deal_card()
                print("New card:", new_card)  # Debug: Print the new card
                player_hand.append(new_card)  # Add a new card
                print("Player hand after hitting:", player_hand)  # Debug: Print the updated player's hand
                if calculate_hand_value(player_hand) > 21:
                    message = 'Player busts. Dealer wins.'
                    if len(dealer_hand) < 2:
                        dealer_hand.append(deal_card())  # Add a new card if only one card is present
                    else:
                        dealer_hand[1] = deal_card()  # Reveal the second card

            elif action == 'stand':
                # Dealer's turn
                if len(dealer_hand) < 2:
                    dealer_hand.append(deal_card())  # Add a new card if only one card is present
                else:
                    dealer_hand[1] = deal_card()  # Reveal the second card
                while calculate_hand_value(dealer_hand) < 17:
                    dealer_hand.append(deal_card())
                player_value = calculate_hand_value(player_hand)
                dealer_value = calculate_hand_value(dealer_hand)
                if dealer_value > 21 or dealer_value < player_value:
                    message = 'Player wins!'
                elif dealer_value > player_value:
                    message = 'Dealer wins.'
                else:
                    message = 'It\'s a draw.'

    # Render the play.html template with the updated context
    context = {
        'player_hand': player_hand,
        'dealer_hand': dealer_hand,
        'message': message
    }

    # Update the player's hand in the session
    request.session['player_hand'] = player_hand

    return render(request, 'blackjack/play.html', context)
