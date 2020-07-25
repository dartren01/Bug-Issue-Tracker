from django.urls import path

from . import views

urlpatterns = [
    path('tickets', views.ListTicket.as_view()),
    path('tickets/create', views.CreateTicket.as_view()),
    path('tickets/<int:pk>', views.DetailTicket.as_view()),
]
