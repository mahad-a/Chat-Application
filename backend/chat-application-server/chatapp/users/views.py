from django.shortcuts import render
# users/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from .models import *
import json
import logging

logger = logging.getLogger()
logger.setLevel("INFO")

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            # For now, just print the received data
            logger.info(f"Username: {username}, Password: {password}")
            # Check if a user with the given username exists
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return JsonResponse({"error": "Invalid username or password"}, status=400)

            # Verify the password
            if check_password(password, user.password):
                return JsonResponse({"message": "Login successful"}, status=200)
            else:
                return JsonResponse({"error": "Invalid username or password"}, status=400)
            # return JsonResponse({"message": "Received"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)
