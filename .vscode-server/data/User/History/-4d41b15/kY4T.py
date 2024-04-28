# blackjack/models.py
from django.db import models
from django.contrib.auth.models import User

class BlackjackGame(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Game played by {self.player.username} at {self.timestamp}"

class BlackjackMove(models.Model):
    HIT = 'HIT'
    STAND = 'STAND'
    DOUBLE_DOWN = 'DOUBLE_DOWN'
    SPLIT = 'SPLIT'
    MOVE_CHOICES = [
        (HIT, 'Hit'),
        (STAND, 'Stand'),
        (DOUBLE_DOWN, 'Double Down'),
        (SPLIT, 'Split'),
    ]

    game = models.ForeignKey(BlackjackGame, on_delete=models.CASCADE)
    move = models.CharField(max_length=20, choices=MOVE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_move_display()} at {self.timestamp}"

