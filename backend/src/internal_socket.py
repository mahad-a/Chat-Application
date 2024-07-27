# internal_socket.py
from flask_socketio import send

def handle_message(message):
    print('Received message: ' + message)
    send(message, broadcast=True)

def handle_connect():
    print('Client connected')
