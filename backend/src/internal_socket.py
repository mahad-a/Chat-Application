# internal_socket.py
from flask_socketio import send
import logging

def handle_message(message):
    # print('Received message: ' + message)
    print(message)
    send(message, broadcast=True)
    logging.info(f"Received message: {message}")
    # Send a response to the frontend
    # emit('response', 'Hello Front End!', broadcast=True)
    return "Hello Front End!"

def handle_login(login):
    username = login.get('username')
    password = login.get('password')
    print(f"Username: {username}, Password: {password}")

    
def handle_connect():
    print('Client connected')
