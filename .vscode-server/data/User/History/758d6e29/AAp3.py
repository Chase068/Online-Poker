from django.shortcuts import render
import random

# Define card ranks and suits
ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
suits = ['♠', '♥', '♦', '♣']

# Define a dictionary to map card ranks to values
card_values = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11  # Ace can be 11 or 1
}

# Function to deal a card
def deal_card():
    return random.choice(ranks) + random.choice(suits)

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

# Initialize player and dealer hands outside the view
player_hand = []
dealer_hand = []

def index(request):
    return render(request, 'blackjack/index.html')

def play(request):
    global player_hand, dealer_hand

    # Reset player and dealer hands
    player_hand = []
    dealer_hand = []

    # Initialize message
    message = ''

    # Deal initial hands
    player_hand = [deal_card(), deal_card()]
    dealer_hand = [deal_card(), '???']  # One card face up, one face down

    # Game logic: Handle player actions (hit or stand)
    if request.method == 'POST':
        action = request.POST.get('action')
        if action == 'hit':
            player_hand.append(deal_card())  # Add a new card
            player_value = calculate_hand_value(player_hand)
            if player_value > 21:
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
    return render(request, 'blackjack/play.html', context)


