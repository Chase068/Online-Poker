from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.views.generic.base import TemplateView


urlpatterns = [
    path("admin/", admin.site.urls),
    path('blackjack/', include('blackjack.urls')),
    path('', TemplateView.as_view(template_name= 'main.html')),
    path("accounts/", include("django.contrib.auth.urls")),
]
