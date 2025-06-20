from typing import List, Optional
from pydantic import BaseModel, validator, Field
import re

class UserLogin(BaseModel):
    phone_number: str = Field(..., example="+819012345678", description="Phone number in E.164 format")

    @validator("phone_number")
    def validate_phone_number(cls, value):
        if not re.fullmatch(r"\+\d{10,15}", value):
            raise ValueError("Invalid phone number format. Use format like +819012345678")
        return value

class UserLoginRes(BaseModel):
    message: str

class UserRegist(BaseModel):
    phone_number: str = Field(..., example="+819012345678", description="Phone number in E.164 format")
    first_name: str
    last_name: str
    
    @validator("phone_number")
    def validate_phone_number(cls, value):
        if not re.fullmatch(r"\+\d{10,15}", value):
            raise ValueError("Invalid phone number format. Use format like +819012345678")
        return value

class UserRegistRes(BaseModel):
    message: str

class UserVerifyReq(BaseModel):
    phone_number: str = Field(..., example="+819012345678", description="Phone number in E.164 format")
    otp_code: str

    @validator("phone_number")
    def validate_phone_number(cls, value):
        if not re.fullmatch(r"\+\d{10,15}", value):
            raise ValueError("Invalid phone number format. Use format like +819012345678")
        return value

class UserVerifyRes(BaseModel):
    message: str
    access_token: str
    token_type: str