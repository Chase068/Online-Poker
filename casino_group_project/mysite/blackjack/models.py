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


class GameRoom(models.Model):
    name = models.CharField(max_length=100)
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosted_game_rooms')
    players = models.ManyToManyField(User, related_name='joined_game_rooms')

    def __str__(self):
        return self.name

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

#for leaderboard
class PlayerWins(models.Model):
    username = models.CharField(max_length=255, unique=True)
    wins = models.IntegerField(default=0)

    def __str__(self):
        return self.username

