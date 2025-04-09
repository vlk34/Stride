from flask import Flask, request
from flask_socketio import SocketIO, emit
from db_connection import send_message, get_messages

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('send_message')
def handle_send_message(data):
    sender_id = data['sender_id']
    receiver_id = data['receiver_id']
    content = data['content']

    send_message(sender_id, receiver_id, content)  # Save to DB
    emit('receive_message', {
        'sender_id': sender_id,
        'receiver_id': receiver_id,
        'content': content
    }, broadcast=True)  # Broadcast the message to everyone

@socketio.on('get_messages')
def handle_get_messages(data):
    sender_id = data['sender_id']
    receiver_id = data['receiver_id']
    messages = get_messages(sender_id, receiver_id)
    emit('message_history', messages)

if __name__ == '__main__':
    socketio.run(app, debug=True)
