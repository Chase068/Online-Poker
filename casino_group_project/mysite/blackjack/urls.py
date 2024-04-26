from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('index/', views.index, name='index'),
    path('play/', views.play, name='play'),
    path('register/', views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('lobby/', views.lobby, name='lobby'),
    path('join/<int:game_id>/', views.join_room, name='join_room'),
    path('create/', views.create_room, name='create_room'),
    path('bet/', views.bet, name='bet'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
]

