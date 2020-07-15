from django.urls import path

from . import views

urlpatterns = [
    path('api/tickets', views.ListTicket.as_view()),
    path('api/tickets/<int:pk>/', views.DetailTicket.as_view()),
]