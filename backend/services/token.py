import os
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from typing import Optional

import models
from dotenv import load_dotenv
from fastapi import HTTPException, Security, status, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from logging_config import get_logger
from database import get_db

security = HTTPBearer(auto_error=True)
load_dotenv()

# ロガーの取得
logger = get_logger(__name__)

SECRET_KEY = os.getenv("SECRET_JWT_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440


async def verify_token(db: Session = Depends(get_db), credentials: HTTPAuthorizationCredentials = Security(security)) -> str:
    try:
        token = credentials.credentials
        blacklisted_token = (
            db.query(models.BlacklistedToken)
            .filter(models.BlacklistedToken.token == token)
            .first()
        )
        
        if blacklisted_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has been blacklisted, please log in again",
            )

        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])

        phone_number = payload.get("sub")
        if phone_number is None:
            raise ValueError
        
        return phone_number
    except JWTError:
        logger.error("Invalid authentication credentials")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def blacklist_token(token: str, db: Session):
    try:
        # Decode the token to get its expiry date
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        expiry_date = datetime.utcfromtimestamp(payload.get("exp"))

        # Store the token and its expiration in the blacklist
        blacklisted_token = models.BlacklistedToken(
            token=token,
            expiry_date=expiry_date
        )
        db.add(blacklisted_token)
        db.commit()
    except JWTError as e:
        # Handle all JWT-related errors
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"JWT Error: {str(e)}"
        )    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to blacklist token"
        )
    