# chatapp/views.py
from django.shortcuts import render
from django.http import HttpResponse
import os

def index(request):
    with open(os.path.join('/app/build', 'index.html')) as f:
        return HttpResponse(f.read())

