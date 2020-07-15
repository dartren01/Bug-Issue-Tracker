from django.test import TestCase
from .models import Ticket

# Create your tests here.
class TicketModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Ticket.objects.create(title='first ticket')
        Ticket.objects.create(description='my first ticket')

    def testTitle(self):
        ticket = Ticket.objects.get(id=1)
        expectedName = f'{ticket.title}'

        self.assertEqual(expectedName, 'first ticket')

    def testDescription(self):
        ticket = Ticket.objects.get(id=2)
        expectedDescription = f'{ticket.description}'

        self.assertEqual(expectedDescription, 'my first ticket')

