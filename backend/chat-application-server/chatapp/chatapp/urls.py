"""
URL configuration for chatapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from chat_messages import views
from users.views import *
from . import views as main_views


urlpatterns = [
    path('', main_views.index, name='index'),
    path('api/messages', views.get_messages),
    path('api/messages/add/', views.add_message, name='send_message'),
    path('api/login/', login_view, name='login'),
    path('api/signup/', signup_view, name='signup'),
    path('api/get_all_users/', get_all_users, name='get_users')
    # Add other paths as necessary
]