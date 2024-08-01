from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from dotenv import load_dotenv
import os
from internal_socket import *

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

load_dotenv()  # Ensure this is called to load variables from .env

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

@socketio.on('chat_message')
def handle_client_message(message):
    handle_message(message)
    emit('chat_response', {'message': 'Hello MY Front End!'}, broadcast=True)

@socketio.on('login')
def handle_client_login(login_info):
    handle_login(login_info)
    emit('login_successful', {'message': 'Login Successful!'}, broadcast=True)


@socketio.on('connect')
def handle_connect():
    logging.info('Client connected')

if __name__ == '__main__':
    logging.info("Starting Flask application...")
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
