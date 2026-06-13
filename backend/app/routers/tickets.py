from sqlalchemy import or_
from sqlalchemy.orm import Session

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from app.db.database import get_db

from app.models.ticket import Ticket
from app.models.note import Note

from app.schemas.ticket import (
    TicketCreate,
    TicketResponse,
    TicketUpdate
)

from app.schemas.note import (
    NoteCreate,
    NoteResponse
)

router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)


# CREATE TICKET
@router.post(
    "",
    response_model=TicketResponse,
    status_code=status.HTTP_201_CREATED
)
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db)
):
    db_ticket = Ticket(
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        issue_title=ticket.issue_title,
        description=ticket.description
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    db_ticket.ticket_id = f"TKT-{1000 + db_ticket.id}"

    db.commit()
    db.refresh(db_ticket)

    return db_ticket


# GET ALL TICKETS
@router.get(
    "",
    response_model=list[TicketResponse]
)
def get_tickets(
    db: Session = Depends(get_db)
):
    tickets = (
        db.query(Ticket)
        .order_by(Ticket.created_at.desc())
        .all()
    )

    return tickets


# SEARCH TICKETS
# IMPORTANT:
# Must come BEFORE /{ticket_id}
@router.get(
    "/search",
    response_model=list[TicketResponse]
)
def search_tickets(
    q: str,
    db: Session = Depends(get_db)
):
    tickets = (
        db.query(Ticket)
        .filter(
            or_(
                Ticket.ticket_id.ilike(f"%{q}%"),
                Ticket.customer_name.ilike(f"%{q}%"),
                Ticket.customer_email.ilike(f"%{q}%"),
                Ticket.issue_title.ilike(f"%{q}%"),
                Ticket.description.ilike(f"%{q}%")
            )
        )
        .order_by(Ticket.created_at.desc())
        .all()
    )

    return tickets
@router.get(
    "/filter",
    response_model=list[TicketResponse]
)
def filter_tickets(
    status: str,
    db: Session = Depends(get_db)
):
    tickets = (
        db.query(Ticket)
        .filter(Ticket.status == status)
        .order_by(Ticket.created_at.desc())
        .all()
    )

    return tickets

# GET SINGLE TICKET
@router.get(
    "/{ticket_id}",
    response_model=TicketResponse
)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    return ticket


# UPDATE TICKET STATUS
@router.put(
    "/{ticket_id}",
    response_model=TicketResponse
)
def update_ticket(
    ticket_id: int,
    ticket_update: TicketUpdate,
    db: Session = Depends(get_db)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    ticket.status = ticket_update.status

    db.commit()
    db.refresh(ticket)

    return ticket


# ADD NOTE TO TICKET
@router.post(
    "/{ticket_id}/notes",
    response_model=NoteResponse,
    status_code=status.HTTP_201_CREATED
)
def add_note(
    ticket_id: int,
    note_data: NoteCreate,
    db: Session = Depends(get_db)
):
    ticket = (
        db.query(Ticket)
        .filter(Ticket.id == ticket_id)
        .first()
    )

    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )

    note = Note(
        ticket_fk=ticket.id,
        note=note_data.note
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return note
@router.delete("/{ticket_id}")
def delete_ticket(
    ticket_id: int,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.id == ticket_id
    ).first()

    if not ticket:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )

    db.delete(ticket)
    db.commit()

    return {
        "message": "Ticket deleted successfully"
    }