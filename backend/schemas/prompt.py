from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import time
from enum import Enum

class ScheduleFrequency(str, Enum):
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"

class WeekDay(str, Enum):
    Mon = "Mon"
    Tue = "Tue"
    Wed = "Wed"
    Thu = "Thu"
    Fri = "Fri"
    Sat = "Sat"
    Sun = "Sun"

class PromptCreateReq(BaseModel):
    phone_number: str = Field(
        ..., 
        example="+819012345678", 
        description="User's phone number in E.164 format"
    )
    title: str = Field(
        ..., 
        example="Daily Motivation", 
        description="Title of the scheduled prompt"
    )
    prompt: str = Field(
        ..., 
        example="Give me a motivational quote", 
        description="The AI prompt content"
    )
    schedule_frequency: ScheduleFrequency = Field(
        ..., 
        example="weekly", 
        description="How often to send the prompt"
    )
    schedule_time: time = Field(
        ..., 
        example="2025-06-20T08:30:00", 
        description="Scheduled time in ISO 8601 format"
    )
    schedule_repeat_period: Optional[int] = Field(
        None, 
        example=2, 
        description="Repeat every N periods (e.g., every 2 weeks)"
    )
    schedule_week_day: Optional[List[WeekDay]] = Field(
        None, 
        example=["Mon", "Fri"], 
        description="Days of the week to run the schedule (only for weekly frequency)"
    )
    is_active: bool = Field(
        ..., 
        example=True, 
        description="Whether the schedule is currently active"
    )
    recipients: List[int] = Field(
        ..., 
        example=[1, 2, 3], 
        description="List of recipient user IDs"
    )

class PromptCreateRes(BaseModel):
    message:str

class PromptList(BaseModel):
    id: str
    title:str
    description:str
    isActive:bool
    isScheduled: bool
    lastSent:str
    recipients:int
    schedule_frequency:str
    schedule_time:time
    schedule_repeat_period: Optional[int]
    schedule_week_day:Optional[List[str]]

class PromptListRes (BaseModel):
    prompt_list: List[PromptList]

class UserList (BaseModel):
    id:str
    phone:str
    name:str
    selected:bool

class UserListRes (BaseModel):
    user_list: List[UserList]

class PromptStatusUpdateReq (BaseModel):
    id:str

class PromptStatusUpdateRes (BaseModel):
    message:str

class PromptScheduleUpdateReq(BaseModel):
    id: str
    schedule_frequency: str
    schedule_time: time
    schedule_repeat_period: int
    schedule_week_day:List[str]

class PromptScheduleUpdateRes(BaseModel):
    message:str

class PromptDeleteRes(BaseModel):
    message:str
class PromptDeleteReq(BaseModel):
    id:str