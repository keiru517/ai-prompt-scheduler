
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
import random
from datetime import datetime, timedelta

import models
import schemas
from services import token
from logging_config import get_logger

logger = get_logger(__name__)

def send_sms(phone: str, code: str):
    print(f"[DEV] Sending SMS to {phone}: Your code is {code}")

def login_user(
    db: Session,
    user_data: schemas.UserLogin
) -> schemas.UserLoginRes:

    try:
        existing_user = (
            db.query(models.User)
            .filter(
                models.User.phone_number == user_data.phone_number
            )
            .first()
        )

        if existing_user:
            # Existing user → send code
            otp_code = str(random.randint(10000, 99999))

            attempt = models.LoginAttempt(
                user_id=existing_user.id,
                login_time = datetime.utcnow(),
                otp = otp_code,
                otp_verified = False,
                expire_at=datetime.utcnow() + timedelta(minutes=5)
            )
            db.add(attempt)
            db.commit()
            send_sms(user_data.phone_number, otp_code)

            return {"message": "VERIFY_CODE_SENT"}
        else:
            # New user → ask for registration
            return {"message": "REGISTER_REQUIRED"}
    except Exception as e:
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
    

def regist_user(
    db: Session,
    user_data: schemas.UserRegist
) -> schemas.UserRegist:

    try:
        existing_user = (
            db.query(
                models.User
            )
            .filter(
                models.User.phone_number == user_data.phone_number
            )
            .first()
        )

        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        new_user = models.User(
            phone_number=user_data.phone_number, 
            first_name=user_data.first_name, 
            last_name=user_data.last_name
        )
        db.add(new_user)
        db.commit()
        otp_code = str(random.randint(10000, 99999))

        attempt = models.LoginAttempt(
            user_id=new_user.id,
            login_time = datetime.utcnow(),
            otp = otp_code,
            otp_verified = False,
            expire_at=datetime.utcnow() + timedelta(minutes=5)
        )
        db.add(attempt)
        db.commit()
        send_sms(user_data.phone_number, otp_code)

        return {"message": "REGISTERED_AND_CODE_SENT"}
    except Exception as e:
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )
    
def verify_user(
    db: Session,
    user_data: schemas.UserVerifyReq
) -> schemas.UserVerifyRes:

    try:
        existing_user = (
            db.query(
                models.User
            )
            .filter(
                models.User.phone_number == user_data.phone_number
            )
            .first()
        )

        if not existing_user:
            raise HTTPException(status_code=400, detail="User not exists")
        
        attempt = (
            db.query(models.LoginAttempt)
            .filter_by(
                user_id=existing_user.id, 
                otp=user_data.otp_code, 
                otp_verified=False
            )
            .order_by(models.LoginAttempt.created_at.desc())
            .first()
        )

        if not attempt or attempt.expire_at < datetime.utcnow():
            raise HTTPException(status_code=400, detail="Invalid or expired code")

        attempt.otp_verified = True
        db.commit()

        access_token_expires = timedelta(minutes=token.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = token.create_access_token(
            data={
                "sub": existing_user.phone_number,
            },
            expires_delta=access_token_expires,
        )
        # (Optional) Generate token or return success
        return {"message": "LOGIN_SUCCESS", "access_token": access_token, "token_type":"bearer"}
    except Exception as e:
        logger.error(f"Unexpected error: {e!s}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Server Error: {e!s}",
        )