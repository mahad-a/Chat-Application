from django.shortcuts import render
# users/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json
from rest_framework_simplejwt.tokens import RefreshToken
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
            logger.info(f"Username: {username}")

            user = User.objects.filter(username=username).first()
            if not user or user.password != password:  # Compare plain text passwords
                return JsonResponse({"error": "Invalid username or password"}, status=400)

            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                "message": "Login successful",
                "token": str(refresh.access_token)
            }, status=200)

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
            if '@' not in email:
                return JsonResponse({"error": "Invalid email format"}, status=400)

            # Check if username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already taken"}, status=400)

            # Convert status to boolean
            status_bool = status.lower() == 'public'

            # Create and save the new user with the plain password
            user = User(
                name=name,
                username=username,
                email=email,
                status=status_bool,
                password=password  # Store the password as entered (plain text)
            )
            user.save()

            return JsonResponse({"message": "User registered successfully"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Invalid method"}, status=405)
