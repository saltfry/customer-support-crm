from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    ticket_id = Column(
        String,
        unique=True,
        nullable=True
    )

    customer_name = Column(
        String,
        nullable=False
    )

    customer_email = Column(
        String,
        nullable=False
    )

    issue_title = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    status = Column(
        String,
        default="Open"
    )

    created_at = Column(
    DateTime,
    default=datetime.utcnow,
    nullable=False
)

    notes = relationship(
        "Note",
        back_populates="ticket",
        cascade="all, delete-orphan"
    )