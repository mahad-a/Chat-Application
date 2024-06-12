from flask import Flask
from flask_socketio import SocketIO
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
socketio = SocketIO(app)

import routes
import internal_socket

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
