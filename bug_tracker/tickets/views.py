from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework.response import Response
from rest_framework import status

# API classes


class ListTicket(generics.ListCreateAPIView):
    serializer_class = TicketSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        return Ticket.objects.all()


class DetailTicket(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [
        permissions.AllowAny
    ]
