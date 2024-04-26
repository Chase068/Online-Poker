from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import login
from .models import GameRoom, Player, PlayerWins
from .models import BlackjackGame
import random

# Define card ranks and suits
ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
suits = ['♠', '♥', '♦', '♣']

# Define a dictionary to map card ranks to values
card_values = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11  # Ace can be 11 or 1
}

#Constructing:)-----------------------

# Define a wallet function (which is betting) before starting the game

def make_change(amount):
    """Makes change for a given amount using quarters, dimes, nickels, and pennies.

    Args:
        amount: The amount of money to make change for (in cents).

    Returns:
        A dictionary containing the number of quarters, dimes, nickels, and pennies needed.
    """
    coins = {
        "quarter": 25,
        "dime": 10,
        "nickel": 5,
        "penny": 1
    }

    change = {}
    for coin, value in coins.items():
        while amount >= value:
            change[coin] = change.get(coin, 0) + 1
            amount -= value

    return change

amount = 78  # Change for 78 cents
change = make_change(amount)

print(change)  # Output: {'quarter': 3, 'penny': 3}


# Referenced by greedy algorithm.

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

@login_required
def bet(request):
    if request.method == 'POST':
        bet_amount = int(request.POST.get('bet_amount', 0))  # Get the bet amount from the form
        if bet_amount > 0:
            request.session['bet_amount'] = bet_amount  # Store the bet amount in the session
            return redirect('play')  # Redirect to the play view to start the game

    return render(request, 'blackjack/bet.html')  # Render the bet template for the user to place a bet

@login_required
def index(request):
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
   # return render(request, 'blackjack/register.html')

@login_required
def lobby(request):
    # Get list of online players
    online_players = Player.objects.filter(is_online=True).exclude(user=request.user)

    # Get list of available game rooms
    available_rooms = GameRoom.objects.all()

    context = {
        'online_players': online_players,
        'available_rooms': available_rooms,
    }
    return render(request, 'blackjack/lobby.html', context)

@login_required
def play(request):
    # Print session data before initializing player and dealer hands
    print("Session before initialization:", request.session)

    # Initialize player session data if not already present
    if 'player_hand' not in request.session:
        request.session['player_hand'] = []
        request.session['dealer_hand'] = []
        request.session['bet_amount'] = 0  # Add a placeholder for bet amount
        request.session['wallet'] = 1000  # Initial wallet amount

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

                    #Add win to users stats
                    player = PlayerWins.objects.get(username=request.user.username)
                    player.wins = player.wins + 1
                    player.save()
                elif dealer_value > player_value:
                    message = 'Dealer wins.'
                else:
                    message = 'It\'s a draw.'

                # Update wallet based on the game outcome
                if message == 'Player wins!':
                    request.session['wallet'] += 2 * request.session['bet_amount']
                elif message == 'Dealer wins.':
                    request.session['wallet'] -= request.session['bet_amount']

    # Render the play.html template with the updated context
    context = {
        'player_hand': player_hand,
        'dealer_hand': dealer_hand,
        'message': message,
        'wallet': request.session['wallet'],  # Include wallet in the context
    }

    # Update the player's hand in the session
    request.session['player_hand'] = player_hand

    return render(request, 'blackjack/play.html', context)


@login_required
def join_room(request, game_id):
    game = BlackjackGame.objects.get(pk=game_id)
    game.players.add(request.user)
    return redirect('play_game', game_id=game_id)

@login_required
def create_room(request):
    new_game = BlackjackGame.objects.create()
    new_game.players.add(request.user)
    return redirect('play_game', game_id=new_game.id)

def leaderboard(request):
    # Get the top 5 players by wins
    top_players = PlayerWins.objects.order_by('-wins')[:5]

    # Pass the top players to the template
    players = {
        'top_players': top_players
    }

    return render(request, 'blackjack/leaderboard.html', players)