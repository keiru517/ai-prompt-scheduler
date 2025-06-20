from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
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
    schedule_time: datetime = Field(
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
