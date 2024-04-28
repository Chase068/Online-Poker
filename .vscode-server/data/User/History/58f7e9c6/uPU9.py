from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

# Import the signup view from the registration app
from registration.views import signup
from home.views import home

urlpatterns = [
    path("admin/", admin.site.urls),
    path('blackjack/', include('blackjack.urls')),
    path('holdem/', include('holdem.urls')),
    #path('', TemplateView.as_view(template_name='home/main.html')),
    path('', home, name='home'),
    path('login/', include('registration.urls')),
    path('signup/', signup, name="signup"),
    path("accounts/", include("django.contrib.auth.urls")),
]

