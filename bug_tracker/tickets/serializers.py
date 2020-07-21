from rest_framework import serializers
from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    def create(self, validated_data):
        instance = Ticket.objects.create(title=validated_data['title'],
                                         description=validated_data['description'])
        return instance
