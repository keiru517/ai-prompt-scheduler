from fastapi import APIRouter, Depends

from .auth import router as auth_router

user_public_rotuer = APIRouter()

user_public_rotuer.include_router(auth_router)