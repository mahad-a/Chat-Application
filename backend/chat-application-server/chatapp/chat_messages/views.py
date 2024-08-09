from django.http import JsonResponse
from .models import Message

def add_message(request):
    if request.method == 'POST':
        data = request.json
        message = Message.objects.create(content=data['content'], sender=data['sender'])
        return JsonResponse({'id': message.id})

def get_messages(request):
    messages = Message.objects.all()
    return JsonResponse([{'id': m.id, 'content': m.content, 'sender': m.sender.username, 'timestamp': m.timestamp} for m in messages], safe=False)
