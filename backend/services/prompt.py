
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Dict, Optional

import models
import schemas
from services import token
from logging_config import get_logger

logger = get_logger(__name__)

def create_prompt(
    db: Session,
    prompt_data: schemas.PromptCreateReq
) -> schemas.PromptCreateRes:

    try:
        existing_user = (
            db.query(models.User)
            .filter(
                models.User.phone_number == prompt_data.phone_number
            )
            .first()
        )

        if not existing_user:
            raise HTTPException(
                status_code=404,
                detail="The User does not exist",
            )

        existing_prompt = (
            db.query(
                models.Prompt
            )
            .filter(
                models.Prompt.user_id == existing_user.id,
                models.Prompt.title == prompt_data.title
            )
            .first()
        )

        if existing_prompt:
            raise HTTPException(
                status_code=400,
                detail="Same Prompt exist",
            )
        data = {
            "user_id": existing_user.id,
            "title": prompt_data.title,
            "prompt": prompt_data.prompt,
            "schedule_frequency": prompt_data.schedule_frequency,
            "schedule_time": prompt_data.schedule_time,
            "is_active": prompt_data.is_active
        }

        # Only include if not None
        if prompt_data.schedule_repeat_period is not None:
            data["schedule_repeat_period"] = prompt_data.schedule_repeat_period

        if prompt_data.schedule_week_day is not None:
            data["schedule_week_day"] = prompt_data.schedule_week_day

        new_prompt = models.Prompt(**data)

        db.add(new_prompt)
        db.flush()

        for recipient_id in prompt_data.recipients:
            existing_prompt_recipient = (
                db.query(
                    models.PromptRecipient
                )
                .filter(
                    models.PromptRecipient.prompt_id == new_prompt.id,
                    models.PromptRecipient.recipient_id == recipient_id
                )
                .first()
            )

            if existing_prompt_recipient:
                raise HTTPException(
                    status_code=400,
                    detail="Same prompt recipient exist",
                )
            
            new_prompt_recipient = models.PromptRecipient(
                prompt_id = new_prompt.id,
                recipient_id = recipient_id 
            )
            db.add(new_prompt_recipient)
        db.commit()

        return {"message": "Prompt_Created_Succesfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
    

def get_scheduler_list(
    db: Session,
    phone_number: str
) -> List[schemas.PromptList]:

    try:
        existing_user = (
            db.query(models.User)
            .filter(
                models.User.phone_number == phone_number
            )
            .first()
        )

        if not existing_user:
            raise HTTPException(
                status_code=404,
                detail="The User does not exist",
            )

        prompts = (
            db.query(
                models.Prompt,
            )
            .filter(
                models.Prompt.user_id == existing_user.id,
                models.Prompt.deleted_at.is_(None)
            )
            .order_by(models.Prompt.created_at.desc())
            .all()
        )

        prompt_list = []
        for prompt in prompts:
            recipient_count = (
                db.query(models.PromptRecipient)
                .filter(models.PromptRecipient.prompt_id == prompt.id)
                .count()
            )

            prompt_list.append({
                "id": str(prompt.id),
                "title": prompt.title,
                "description": prompt.prompt,
                "isActive": prompt.is_active,
                "isScheduled": bool(prompt.schedule_time),
                "lastSent":"183 days ago",
                "recipients": recipient_count,
                "schedule_frequency": prompt.schedule_frequency,
                "schedule_time": prompt.schedule_time,
                "schedule_repeat_period": prompt.schedule_repeat_period,
                "schedule_week_day": prompt.schedule_week_day
            })

        return prompt_list
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
    

def get_user_list(
    db: Session,
) -> List[schemas.UserList]:

    try:
        users = (
            db.query(
                models.User
            )
            .all()
        )

        user_list = []
        for user in users:
            user_list.append({
                "id": str(user.id),
                "phone": user.phone_number,
                "name": f"{user.first_name} {user.last_name}",
                "selected": False
            })

        return user_list
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
    
def update_prompt_status(
    db: Session,
    prompt_data: schemas.PromptStatusUpdateReq
) -> schemas.PromptStatusUpdateRes:

    try:
        existing_prompt = (
            db.query(models.Prompt)
            .filter(
                models.Prompt.id == int(prompt_data.id)
            )
            .first()
        )

        if not existing_prompt:
            raise HTTPException(
                status_code=404,
                detail="The Prompt does not exist",
            )

        existing_prompt.is_active = not existing_prompt.is_active
        db.commit()

        return {"message": "Prompt__status_updated_Succesfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
    

def update_prompt_schedule(
    db: Session,
    prompt_data: schemas.PromptScheduleUpdateReq
) -> schemas.PromptScheduleUpdateRes:

    try:
        existing_prompt = (
            db.query(models.Prompt)
            .filter(
                models.Prompt.id == int(prompt_data.id)
            )
            .first()
        )

        if not existing_prompt:
            raise HTTPException(
                status_code=404,
                detail="The Prompt does not exist",
            )

        if prompt_data.schedule_frequency == 'daily':
            existing_prompt.schedule_frequency = prompt_data.schedule_frequency
            existing_prompt.schedule_time = prompt_data.schedule_time
        elif prompt_data.schedule_frequency == 'weekly':
            existing_prompt.schedule_frequency = prompt_data.schedule_frequency
            existing_prompt.schedule_time = prompt_data.schedule_time
            existing_prompt.schedule_repeat_period = prompt_data.schedule_repeat_period
            existing_prompt.schedule_week_day = prompt_data.schedule_week_day

        db.commit()

        return {"message": "Prompt_schedule_updated_Succesfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
def delete_prompt(
    db: Session,
    prompt_data: schemas.PromptDeleteReq
) -> schemas.PromptScheduleUpdateRes:

    try:
        existing_prompt = (
            db.query(models.Prompt)
            .filter(
                models.Prompt.id == int(prompt_data.id)
            )
            .first()
        )

        if not existing_prompt:
            raise HTTPException(
                status_code=404,
                detail="The Prompt does not exist",
            )

        existing_prompt.deleted_at = datetime.utcnow()
        db.commit()

        return {"message": "Prompt_schedule_updated_Succesfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
    