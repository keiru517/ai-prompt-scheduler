from typing import List, Optional
from pydantic import BaseModel

class UserLogin(BaseModel):
    phone_number: str

class UserLoginRes(BaseModel):
    message: str

class UserRegist(BaseModel):
    phone_number: str
    first_name: str
    last_name: str

class UserRegistRes(BaseModel):
    message: str

class UserVerifyReq(BaseModel):
    phone_number: str
    otp_code: str

class UserVerifyRes(BaseModel):
    message: str
    access_token: str
    token_type: str