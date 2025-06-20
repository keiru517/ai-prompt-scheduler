
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import random
from datetime import datetime, timedelta

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
    
