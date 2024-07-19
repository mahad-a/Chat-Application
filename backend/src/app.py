# app.py
from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)  # Apply CORS to your Flask app

# Import event handlers from internal_socket.py
from internal_socket import handle_message, handle_connect

# Register event handlers
socketio.on_event('message', handle_message)
socketio.on_event('connect', handle_connect)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
