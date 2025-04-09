import socketio

sio = socketio.Client()

@sio.event
def connect():
    print("✅ Connected to SocketIO!")

@sio.event
def receive_message(data):
    print("📥 Incoming message:", data)

@sio.event
def message_history(data):
    print("🕓 Message history:", data)

@sio.event
def disconnect():
    print("❌ Disconnected.")

# Connect to Flask-SocketIO server
sio.connect('http://localhost:5000')

# Send message interactively
def send_message_interactive():
    sender_id = input("Enter sender ID: ")
    receiver_id = input("Enter receiver ID: ")
    content = input("Enter message content: ")

    # Send test message
    sio.emit('send_message', {
        'sender_id': sender_id,
        'receiver_id': receiver_id,
        'content': content
    })
    print(f"📤 Message sent: {content}")

# Get message history interactively
def get_message_history_interactive():
    sender_id = input("Enter sender ID: ")
    receiver_id = input("Enter receiver ID: ")

    # Request message history
    sio.emit('get_messages', {
        'sender_id': sender_id,
        'receiver_id': receiver_id
    })

# Infinite loop to wait for input
try:
    while True:
        print("\nChoose an option:")
        print("1 - Send a message")
        print("2 - Get message history")
        print("3 - Exit")

        choice = input("Make your choice (1/2/3): ")

        if choice == '1':
            send_message_interactive()
        elif choice == '2':
            get_message_history_interactive()
        elif choice == '3':
            break
        else:
            print("Invalid choice! Please try again.")
except KeyboardInterrupt:
    print("🔌 Manually disconnected.")
    sio.disconnect()
