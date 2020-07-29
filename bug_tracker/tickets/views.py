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

    def get(self, request, *args, **kwargs):
        instance = Ticket.objects.get(id=self.kwargs.get('pk'))
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = Ticket.objects.get(id=self.kwargs.get('pk'))
        serializer = self.get_serializer(
            instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        Ticket.objects.filter(id=self.kwargs.get('pk')).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
