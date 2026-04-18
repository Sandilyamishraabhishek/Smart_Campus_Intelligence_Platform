import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = "campus_intelligence"

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

db_connection = MongoDB()

async def connect_to_mongo():
    db_connection.client = AsyncIOMotorClient(MONGODB_URL)
    db_connection.db = db_connection.client[DATABASE_NAME]
    print(f"Connected to MongoDB at {MONGODB_URL}")

async def close_mongo_connection():
    db_connection.client.close()
    print("Closed MongoDB connection")

def get_database():
    return db_connection.db
