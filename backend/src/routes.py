from flask import request, jsonify
from app import app
from db import SessionLocal
from models import Message

@app.route('/api/messages', methods=['POST'])
def add_message():
    db = SessionLocal()
    data = request.json
    new_message = Message(content=data['content'], sender=data['sender'])
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    db.close()
    return jsonify({'id': new_message.id})

@app.route('/api/messages', methods=['GET'])
def get_messages():
    db = SessionLocal()
    messages = db.query(Message).all()
    db.close()
    return jsonify([{'id': m.id, 'content': m.content, 'sender': m.sender, 'timestamp': m.timestamp} for m in messages])
