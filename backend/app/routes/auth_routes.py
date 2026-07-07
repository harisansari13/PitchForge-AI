"""
Authentication routes — signup, login, and profile.

The database handle is retrieved *inside* each handler (not at module level)
so that the routes work correctly regardless of when the module is imported
relative to the lifespan startup that connects to MongoDB.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database.connection import get_db
from app.models.auth_models import UserLogin, UserSignup
from app.services.auth_service import (
    create_access_token,
    hash_password,
    verify_password,
    verify_token,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

_bearer = HTTPBearer(auto_error=False)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _users():
    """
    Return the users collection, or raise 503 if the database is not yet
    available (e.g. MongoDB URI not configured or still connecting).
    """
    db = get_db()
    if db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database not available. Configure MONGODB_URI to enable authentication.",
        )
    return db["users"]


def _require_auth(credentials: HTTPAuthorizationCredentials = Depends(_bearer)) -> str:
    """Dependency that validates the Bearer token and returns the email claim."""
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing",
            headers={"WWW-Authenticate": "Bearer"},
        )
    email = verify_token(credentials.credentials)
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return email


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@router.get("/test")
def test_auth():
    """Health-check endpoint for the auth router."""
    return {"message": "Authentication route working"}


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserSignup):
    """Register a new user account."""
    users = _users()

    if users.find_one({"email": user.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    users.insert_one(
        {
            "name": user.name,
            "email": user.email,
            "password": hash_password(user.password),
        }
    )

    return {"success": True, "message": "User registered successfully"}


@router.post("/login")
def login(user: UserLogin):
    """Authenticate and return a JWT access token."""
    users = _users()

    existing = users.find_one({"email": user.email})
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if not verify_password(user.password, existing["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/profile")
def profile(email: str = Depends(_require_auth)):
    """Return basic profile info for the authenticated user."""
    users = _users()
    user = users.find_one({"email": email}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return {"success": True, "data": user}
