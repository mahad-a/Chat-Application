# test_backend.py

from socketio import Client

# Replace with your server URL
SERVER_URL = 'http://localhost:5000'

# Initialize a SocketIO client
socket = Client()

@socket.event
def connect():
    print('Connected to server')

@socket.event
def disconnect():
    print('Disconnected from server')

# Connect to the server
socket.connect(SERVER_URL)

# Example: Send a message to server and receive a response
socket.emit('test_message', {'data': 'Hello, server!'})

@socket.event
def test_response(data):
    print('Server response:', data)

# Keep the connection open (you can add more interactions here)
input('Press Enter to exit\n')

# Clean up
socket.disconnect()
