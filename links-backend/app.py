from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import psycopg2
from supabase import create_client, Client


from argon2 import PasswordHasher

load_dotenv()

USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")


app = Flask(__name__)
CORS(app)

@app.route("/")
def sb_connection():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    Client = create_client(url, key)

    return Client


def get_db_connection():
    try:
        conn = psycopg2.connect(
            user=USER,
            password=PASSWORD,
            host=HOST,
            port=PORT,
            dbname=DBNAME
        )
        print("Connection successful!")
        return conn
    except Exception as e:
        print(f"Failed to connect {e}")


#### GOLFERS ####

@app.route("/api/golfers")
def get_golfers():
    supabase = sb_connection()

    response = (
    supabase.table("golfers")
    .select("*")
    .execute()
    )

    return response.data

'''
@app.route("/api/golfers", methods=["GET"])
def get_golfers():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("select id, display_name, handicap from golfers")
    result = cur.fetchall()
    print(result)
    conn.close()

    return "Placeholder"
'''

def new_golfer(account_id):
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute(f"INSERT into golfers (account_id) VALUES ({account_id}) RETURNING id")
        conn.commit()
    except Exception as e:
        print(e)

    conn.close()
    return 


#### ACCOUNTS ####

@app.route("/api/accounts", methods=["POST"])
def add_account():
    data = request.get_json()
    email = data["email"]
    pword = data["password"]
    ph = PasswordHasher()
    password_hash = ph.hash(pword)

    conn = get_db_connection()
    cur = conn.cursor()
    try: 
        cur.execute(f"INSERT into accounts (email, password_hash) VALUES ({email}, {password_hash}) RETURNING id")
        new_id = cur.fetchone()[0]
        conn.commit()
        print(cur.rowcount)
        message = "success"
        new_golfer(new_id)
    except Exception as e:
        print(e)
        message = "failed"

    conn.close()

    return jsonify({"message": f"{message}"}), 201 ### Prompt user to enter a username




#### GOLFER POSTS ####

@app.route('/api/posts', methods=['POST'])
def create_post():
    data = request.get_json()

    caption = data["caption"]
    id = data["id"]
    


    # Here you would insert data into the DB
    return jsonify({"message": "Post created", "post": data}), 201


#### CLUB POSTS ####


if __name__ == "__main__":
    app.run(debug=True)