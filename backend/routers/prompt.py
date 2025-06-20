from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

import schemas
import services
from database import get_db

router = APIRouter()

@router.post("/create", response_model=schemas.PromptCreateRes)
async def user_login(
    prompt_data: schemas.PromptCreateReq = Body(...),
    db: Session = Depends(get_db), 
    
):
    return services.create_prompt(
        db=db,
        prompt_data = prompt_data
    )
  