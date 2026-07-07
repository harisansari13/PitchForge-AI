"""
Pydantic models for authentication request bodies.
"""
from pydantic import BaseModel, EmailStr, Field, field_validator


class UserSignup(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)

    @field_validator("name")
    @classmethod
    def strip_name(cls, v: str) -> str:
        cleaned = " ".join(v.strip().split())
        if not cleaned:
            raise ValueError("Name cannot be blank")
        return cleaned


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)
