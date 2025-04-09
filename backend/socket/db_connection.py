import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")

def connect_db():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )
        print("Successfully connected to the database!")
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None
    
def send_message(sender_id, receiver_id, content):
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT INTO messages (sender_id, receiver_id, content)
                VALUES (%s, %s, %s)
            """, (sender_id, receiver_id, content))
            conn.commit()
            print("Message successfully sent!")
        except Exception as e:
            print(f"Message sending error: {e}")
            conn.rollback()
        finally:
            cursor.close()
            conn.close()

def get_messages(sender_id, receiver_id):
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                SELECT sender_id, receiver_id, content, sent_at
                FROM messages
                WHERE (sender_id = %s AND receiver_id = %s)
                OR (sender_id = %s AND receiver_id = %s)
                ORDER BY sent_at ASC
            """, (sender_id, receiver_id, receiver_id, sender_id))
            messages = cursor.fetchall()
            return messages
        except Exception as e:
            print(f"Error fetching messages: {e}")
            return None
        finally:
            cursor.close()
            conn.close()
