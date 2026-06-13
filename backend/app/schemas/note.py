from pydantic import BaseModel, Field
from datetime import datetime


class NoteCreate(BaseModel):
    note: str = Field(..., min_length=2)


class NoteResponse(BaseModel):
    id: int
    note: str
    created_at: datetime

    class Config:
        from_attributes = True