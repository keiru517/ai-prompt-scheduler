from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    func,
    ForeignKey,
    Boolean
)
from sqlalchemy.orm import relationship

from .base import Base

class User(Base):
    __tablename__ = "m_users"

    id = Column(Integer, primary_key=True, autoincrement=True, comment="UserID")
    phone_number = Column(String(255), unique=True, nullable=False, comment="phone number")
    first_name = Column(String(255), nullable=False, comment="first name")
    last_name = Column(String(255), nullable=False, comment="last name")

    created_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), comment="created date")
    updated_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), comment="updated date")
    deleted_at = Column(DateTime, nullable=True, comment="deleted date")

    login_attempt = relationship("LoginAttempt", back_populates="user")
    prompt = relationship("Prompt", back_populates="user")
    prompt_recipients = relationship("PromptRecipient", back_populates="user")


class LoginAttempt(Base):
    __tablename__ = "t_login_attempts"
    
    # Define columns
    id = Column(Integer, primary_key=True, index=True, autoincrement=True, comment="login attemp ID")
    user_id = Column(Integer, ForeignKey("m_users.id"), nullable=False, comment="userID")
    login_time = Column(DateTime, nullable=True, comment="login time")
    expire_at  = Column(DateTime, nullable=True, comment="expire time")
    otp = Column(String(6), nullable=True, comment="otp")
    otp_verified = Column(Boolean, default=False, nullable=False, comment="OTP Verify State")

    created_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), comment="created date")
    updated_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), comment="updated date")
    deleted_at = Column(DateTime, nullable=True, comment="deleted date")

    user = relationship("User", back_populates="login_attempt")

class BlacklistedToken(Base):
    __tablename__ = "t_blacklisted_tokens"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, nullable=False, index=True)
    expiry_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), comment="created date")
    updated_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), comment="updated date")
    deleted_at = Column(DateTime, nullable=True, comment="deleted date")