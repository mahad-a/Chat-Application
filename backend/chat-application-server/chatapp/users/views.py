from django.shortcuts import render
# users/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
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

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            status = data.get('status')
            
            # Validate required fields
            if not all([name, username, password, email, status]):
                return JsonResponse({"error": "All fields are required"}, status=400)

            # Validate email format
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({"error": "Invalid email format"}, status=400)

            # Check if username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already taken"}, status=400)

            # Convert status to boolean (assuming dropdown returns 'public' or 'private')
            status_bool = status.lower() == 'public'

            # Create and save the new user
            user = User(
                name=name,
                username=username,
                password=make_password(password),
                status=status_bool,
            )
            user.save()

            return JsonResponse({"message": "User registered successfully"}, status=201)
            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    return JsonResponse({"error": "Invalid method"}, status=405)