from django.http import JsonResponse
from .models import Message
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json

# Add a message: accepts sender_id, receiver_id, and message content
@csrf_exempt
def add_message(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            sender_id = data.get('sender_id')
            receiver_id = data.get('receiver_id')
            content = data.get('content')

            # Validate sender and receiver
            sender = User.objects.filter(id=sender_id).first()
            receiver = User.objects.filter(id=receiver_id).first()

            if not sender or not receiver:
                return JsonResponse({'error': 'Invalid sender or receiver'}, status=400)

            # Create message
            message = Message.objects.create(content=content, sender=sender, receiver=receiver)

            return JsonResponse({'message': 'Message sent successfully', 'id': message.id}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

# Get messages: fetches all messages between a sender and a receiver
def get_messages(request):
    if request.method == 'GET':
        sender_id = request.GET.get('sender_id')
        receiver_id = request.GET.get('receiver_id')

        # Validate sender and receiver
        sender = User.objects.filter(id=sender_id).first()
        receiver = User.objects.filter(id=receiver_id).first()

        if not sender or not receiver:
            return JsonResponse({'error': 'Invalid sender or receiver'}, status=400)

        # Get messages between sender and receiver
        messages = Message.objects.filter(sender=sender, receiver=receiver).order_by('timestamp')

        message_data = [{'id': m.id, 'content': m.content, 'sender': m.sender.username, 'receiver': m.receiver.username, 'timestamp': m.timestamp} for m in messages]

        return JsonResponse(message_data, safe=False)
