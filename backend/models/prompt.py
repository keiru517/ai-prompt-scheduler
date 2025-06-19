from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    func,
    ForeignKey,
    Boolean,
    Text,
    Time,
    ARRAY,
    PrimaryKeyConstraint,
    UniqueConstraint
)
from sqlalchemy.orm import relationship

from .base import Base

class Prompt(Base):
    __tablename__ = "t_prompts"

    id = Column(Integer, primary_key=True, autoincrement=True, comment="prompt ID")
    user_id = Column(Integer, ForeignKey("m_users.id"), nullable=False, comment="userID")
    title = Column(String(255), nullable=False, comment="title")
    prompt = Column(Text, nullable=False, comment="prompt")
    schedule_frequency = Column(String(255), nullable=False, comment="daily or weekly")
    schedule_time = Column(Time, nullable=False, comment="schedule time like 08:00AM")
    schedule_repeat_period = Column(Integer, nullable=True, comment="repeat weeks period")
    schedule_week_day = Column(ARRAY(String), nullable=True, comment='Array of weekdays like ["Mon", "Tue"]')
    is_active = Column(Boolean, nullable=False, comment="True or False")
    created_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), comment="created date")
    updated_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), comment="updated date")
    deleted_at = Column(DateTime, nullable=True, comment="deleted date")

    user = relationship("User", back_populates="prompt") 
    prompt_recipients = relationship("PromptRecipient", back_populates="prompt")

class PromptRecipient(Base):
    __tablename__ = "t_prompt_recipients"

    id = Column(Integer, primary_key=True, autoincrement=True, comment="prompt recipient ID")
    prompt_id = Column(Integer, ForeignKey("t_prompts.id"), nullable=False, comment="Linked Prompt ID")
    recipient_id = Column(Integer, ForeignKey("m_users.id"), nullable=False, comment="Recipient User ID")

    created_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), comment="created date")
    updated_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), comment="updated date")
    deleted_at = Column(DateTime, nullable=True, comment="deleted date")

    __table_args__ = (
        UniqueConstraint("prompt_id", "recipient_id", name="uq_prompt_recipient"),
    )
    prompt = relationship("Prompt", back_populates="prompt_recipients")
    user = relationship("User", back_populates="prompt_recipients")
    prompt_transaction_history = relationship("PromptTransactionHistory", back_populates="prompt_recipients")

class PromptTransactionHistory(Base):
    __tablename__ = "t_prompt_transaction_history"

    id = Column(Integer, primary_key=True, autoincrement=True, comment="transaction history ID")
    prompt_recipient_id = Column(Integer, ForeignKey("t_prompt_recipients.id"), nullable=False, comment="Prompt To Recipient ID")
    status = Column(String(255), nullable=False, comment="status")
    send_date = Column(DateTime, nullable=True, comment="Prompt Send Date")

    created_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), comment="created date")
    updated_at = Column(DateTime, nullable=True, server_default=func.current_timestamp(), onupdate=func.current_timestamp(), comment="updated date")
    deleted_at = Column(DateTime, nullable=True, comment="deleted date")

    prompt_recipients = relationship("PromptRecipient", back_populates="prompt_transaction_history")
