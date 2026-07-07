"""
Pitch data service — CRUD operations against MongoDB (or in-memory fallback).
"""
from datetime import datetime, timezone
from typing import Any, Optional
from uuid import uuid4

from bson import ObjectId
from bson.errors import InvalidId

from app.database.connection import get_db
from app.models.pitch import serialize_document

# ---------------------------------------------------------------------------
# In-memory fallback store (used when MongoDB is not configured)
# ---------------------------------------------------------------------------
memory_store: dict[str, dict[str, Any]] = {}


def _now() -> datetime:
    """Return an aware UTC datetime."""
    return datetime.now(timezone.utc)


def _oid(pitch_id: str) -> Optional[ObjectId]:
    """Convert *pitch_id* to ObjectId, returning None if invalid."""
    try:
        return ObjectId(pitch_id)
    except (InvalidId, Exception):
        return None


class PitchService:
    @staticmethod
    def create_pitch(pitch_data: dict[str, Any]) -> str:
        """Persist a new pitch document and return its string ID."""
        now = _now()
        document = {
            **pitch_data,
            "scores": None,
            "swot": None,
            "competitors": None,
            "valuation": None,
            "created_at": now,
            "updated_at": now,
        }

        db = get_db()
        if db is None:
            pitch_id = uuid4().hex
            document["_id"] = pitch_id
            memory_store[pitch_id] = document
            return pitch_id

        result = db.pitches.insert_one(document)
        return str(result.inserted_id)

    @staticmethod
    def get_pitch(pitch_id: str) -> Optional[dict[str, Any]]:
        """Return a single pitch by ID, or None if not found."""
        db = get_db()
        if db is None:
            return serialize_document(memory_store.get(pitch_id))

        oid = _oid(pitch_id)
        if oid is None:
            return None
        try:
            return serialize_document(db.pitches.find_one({"_id": oid}))
        except Exception:
            return None

    @staticmethod
    def update_section(pitch_id: str, section: str, data: dict[str, Any]) -> bool:
        """
        Overwrite a top-level *section* field on an existing pitch.

        Returns True if the document was found and updated.
        """
        now = _now()
        db = get_db()

        if db is None:
            if pitch_id not in memory_store:
                return False
            memory_store[pitch_id][section] = data
            memory_store[pitch_id]["updated_at"] = now
            return True

        oid = _oid(pitch_id)
        if oid is None:
            return False
        try:
            result = db.pitches.update_one(
                {"_id": oid},
                {"$set": {section: data, "updated_at": now}},
            )
            return result.matched_count == 1
        except Exception:
            return False

    @staticmethod
    def get_history(limit: int = 10, skip: int = 0) -> list[dict[str, Any]]:
        """Return recent pitches sorted newest-first (summary fields only)."""
        db = get_db()
        if db is None:
            rows = sorted(
                memory_store.values(),
                key=lambda item: item["created_at"],
                reverse=True,
            )
            return [serialize_document(row) for row in rows[skip : skip + limit]]

        cursor = (
            db.pitches.find(
                {},
                {
                    "startup_name": 1,
                    "industry": 1,
                    "elevator_pitch": 1,
                    "created_at": 1,
                    "scores": 1,
                },
            )
            .sort("created_at", -1)
            .skip(skip)
            .limit(limit)
        )
        return [serialize_document(row) for row in cursor]
