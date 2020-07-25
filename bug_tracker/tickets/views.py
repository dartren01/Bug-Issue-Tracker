from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework.response import Response
from rest_framework import status

# API classes


class ListTicket(generics.ListAPIView):
    serializer_class = TicketSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        return Ticket.objects.all()


class CreateTicket(generics.CreateAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]


class DetailTicket(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def delete(self, request, *args, **kwargs):
        Ticket.objects.filter(id=self.kwargs.get('pk')).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
