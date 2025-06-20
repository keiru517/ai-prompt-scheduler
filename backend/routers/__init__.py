from fastapi import APIRouter, Depends

import services
from .auth import router as auth_router
from .prompt import router as prompt_router

user_public_rotuer = APIRouter()
user_protect_router =  APIRouter(dependencies=[Depends(services.verify_token)])


user_public_rotuer.include_router(auth_router)
user_protect_router.include_router(prompt_router, prefix="/v1/prompt", tags=["prompt-manage"])