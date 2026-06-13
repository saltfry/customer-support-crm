from app.schemas.note import NoteResponse
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum
from app.schemas.note import NoteResponse


class TicketCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=100)

    customer_email: EmailStr

    issue_title: str = Field(..., min_length=3, max_length=200)

    description: str = Field(..., min_length=10)

class TicketStatus(str, Enum):
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    CLOSED = "Closed"

class TicketUpdate(BaseModel):
    status: TicketStatus


class TicketResponse(BaseModel):
    id: int
    ticket_id: Optional[str]

    customer_name: str
    customer_email: EmailStr

    issue_title: str
    description: str

    status: str
    created_at: datetime

    notes: list[NoteResponse] = []

    class Config:
        from_attributes = True