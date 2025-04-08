from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    sender_id: str
    receiver_id: str
    content: str

def get_connection():
    return psycopg2.connect(
        host="localhost",
        dbname="java project",
        user="postgres",
        password="rootadmin1"
    )

@app.post("/send")
def send_message(message: Message):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO messages (sender_id, receiver_id, content) VALUES (%s, %s, %s)",
        (message.sender_id, message.receiver_id, message.content)
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"status": "ok"}

@app.get("/history")
def get_history(user1: str, user2: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute('''
        SELECT sender_id, receiver_id, content, sent_at
        FROM messages
        WHERE (sender_id = %s AND receiver_id = %s)
           OR (sender_id = %s AND receiver_id = %s)
        ORDER BY sent_at
    ''', (user1, user2, user2, user1))
    rows = cur.fetchall()
    cur.close()
    conn.close()

    return [
        {
            "sender": row[0],
            "receiver": row[1],
            "text": row[2],
            "timestamp": row[3].isoformat()
        }
        for row in rows
    ]
