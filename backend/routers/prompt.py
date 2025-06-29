from fastapi import APIRouter, Body, Depends
from sqlalchemy.orm import Session
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

import schemas
import services
from database import get_db

router = APIRouter()

@router.post("/create", response_model=schemas.PromptCreateRes)
async def prompt_create(
    prompt_data: schemas.PromptCreateReq = Body(...),
    db: Session = Depends(get_db), 
    
):
    
    return services.create_prompt(
        db=db,
        prompt_data = prompt_data
    )
  
@router.get("/scheduler-list", response_model=schemas.PromptListRes)
async def scheduler_list(
    db: Session = Depends(get_db), 
    phone_number:str = Depends(services.verify_token),
):
    prompt_list = services.get_scheduler_list(
        db=db,
        phone_number = phone_number
    )
  
    return {
        "prompt_list": prompt_list,
    }
  
@router.get("/user-list", response_model=schemas.UserListRes)
async def scheduler_list(
    db: Session = Depends(get_db), 
):
    user_list = services.get_user_list(
        db=db,
    )
  
    return {
        "user_list": user_list,
    }



@router.patch("/status-update", response_model=schemas.PromptStatusUpdateRes)
async def prompt_create(
    prompt_data: schemas.PromptStatusUpdateReq = Body(...),
    db: Session = Depends(get_db), 
    
):
    
    return services.update_prompt_status(
        db=db,
        prompt_data = prompt_data
    )

@router.patch("/schedule-update", response_model=schemas.PromptScheduleUpdateRes)
async def prompt_create(
    prompt_data: schemas.PromptScheduleUpdateReq = Body(...),
    db: Session = Depends(get_db), 
    
):
    
    return services.update_prompt_schedule(
        db=db,
        prompt_data = prompt_data
    )

@router.patch("/schedule-update", response_model=schemas.PromptScheduleUpdateRes)
async def prompt_create(
    prompt_data: schemas.PromptScheduleUpdateReq = Body(...),
    db: Session = Depends(get_db), 
    
):
    
    return services.update_prompt_schedule(
        db=db,
        prompt_data = prompt_data
    )

@router.delete("/delete", response_model=schemas.PromptDeleteRes)
async def prompt_create(
    prompt_data: schemas.PromptDeleteReq = Body(...),
    db: Session = Depends(get_db), 
    
):
    
    return services.delete_prompt(
        db=db,
        prompt_data = prompt_data
    )