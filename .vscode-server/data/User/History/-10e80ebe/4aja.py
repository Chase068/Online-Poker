from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
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
    return render(request, 'holdem/index.html')


def play(request):
    if request.method == 'POST' and 'new_game' in request.POST:
        # Reset session variables for a new game
        request.session.pop('player_hand', None)
        request.session.pop('dealer_hand', None)
        return redirect('play')  # Redirect to the same page to start a new game

    # Deal initial hands if not already dealt
    if 'player_hand' not in request.session:
        request.session['player_hand'] = [deal_card(), deal_card()]
        request.session['dealer_hand'] = [deal_card(), '???']  # One card face up, one face down

    player_hand = request.session['player_hand']
    dealer_hand = request.session['dealer_hand']
    message = ''

    # Game logic: Handle player actions (hit or stand)
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'hit':
            player_hand.append(deal_card())  # Add a new card
            if calculate_hand_value(player_hand) > 21:
                message = 'Player busts. Dealer wins.'
                dealer_hand[1] = deal_card()  # Reveal the second card
        elif action == 'stand':
            # Dealer's turn
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

    request.session['player_hand'] = player_hand
    request.session['dealer_hand'] = dealer_hand

    return render(request, 'blackjack/play.html', context)