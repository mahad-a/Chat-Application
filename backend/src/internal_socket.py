from flask_socketio import send, emit
from app import socketio

@socketio.on('message')
def handle_message(message):
    print('Received message: ' + message)
    send(message, broadcast=True)
