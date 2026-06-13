from fastapi import FastAPI

from app.db.database import Base, engine
from app.models.ticket import Ticket
from app.models.note import Note
from app.routers.tickets import router as ticket_router
from app.routers.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ticket_router)
app.include_router(dashboard_router)

@app.get("/")
def root():
    return {
        "message": "Customer Support CRM API Running"
    }
