# config.py
import mysql.connector

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "database": "wound_detox",
    "password": "",
    "port": 3306,
}


def connect_to_database():
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        print("Connected to the database!")
        return conn
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None
