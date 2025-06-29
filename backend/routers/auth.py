from fastapi import APIRouter, Body, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import List, Optional

import schemas
import services
from database import get_db

router = APIRouter(prefix="/v1/auth", tags=["user-auth"])

@router.post("/login", response_model=schemas.UserLoginRes)
async def user_login(
    login_data: schemas.UserLogin = Body(...),
    db: Session = Depends(get_db), 
    
):
    return services.login_user(
        db=db,
        user_data = login_data
    )
  

@router.post("/regist", response_model=schemas.UserRegistRes)
async def user_regist(
    regist_data: schemas.UserRegist = Body(...),
    db: Session = Depends(get_db), 
    
):
    return  services.regist_user(
        db=db,
        user_data = regist_data
    )
  
@router.patch("/verify-sms", response_model=schemas.UserVerifyRes)
async def update_user(
    user_data: schemas.UserVerifyReq= Body(...),
    db: Session = Depends(get_db), 
):
    return services.verify_user(
        db=db,
        user_data=user_data
    )