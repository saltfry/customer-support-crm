from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    ticket_fk = Column(
        Integer,
        ForeignKey("tickets.id"),
        nullable=False
    )

    note = Column(
        Text,
        nullable=False
    )

    created_at = Column(
    DateTime,
    default=datetime.utcnow,
    nullable=False
)

    ticket = relationship(
        "Ticket",
        back_populates="notes"
    )