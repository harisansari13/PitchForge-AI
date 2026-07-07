"""
MongoDB connection management.

Uses a module-level singleton so the connection is shared across all requests.
The ``connect_db`` / ``close_db`` functions are called from the FastAPI lifespan
context manager in ``main.py``.
"""
import os
from typing import Optional

from dotenv import load_dotenv
from pymongo import ASCENDING, MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

MONGODB_URI: str = os.getenv("MONGODB_URI", "")
DATABASE_NAME: str = os.getenv("DATABASE_NAME", "pitchforge")

client: Optional[MongoClient] = None
db = None


def connect_db():
    """
    Open the MongoDB connection and seed required indexes.

    Returns the database handle on success, or ``None`` if the URI is not
    configured or the server is unreachable.
    """
    global client, db

    if db is not None:
        return db

    if not MONGODB_URI:
        print("⚠  MongoDB URI not configured — running with in-memory pitch storage.")
        return None

    try:
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        # Verify the connection immediately
        client.admin.command("ping")
        db = client[DATABASE_NAME]

        # Indexes ────────────────────────────────────────────────────────────
        # pitches: most-recent-first history queries
        db.pitches.create_index([("created_at", ASCENDING)])
        # users: fast login lookups + enforce unique emails at the DB level
        db.users.create_index([("email", ASCENDING)], unique=True)

        print(f"✅ Connected to MongoDB — database: {DATABASE_NAME}")
        return db

    except PyMongoError as exc:
        print(f"❌ MongoDB unavailable: {exc}")
        client = None
        db = None
        return None


def close_db():
    """Close the MongoDB connection and reset the module-level handles."""
    global client, db
    if client:
        client.close()
    client = None
    db = None


def get_db():
    """Return the current database handle (may be ``None`` if not connected)."""
    return db
