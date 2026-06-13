# Customer Support CRM

A full-stack Customer Support CRM application built using **React**, **FastAPI**, **SQLAlchemy**, and **SQLite**. The system allows support teams to create, track, update, and manage customer support tickets through a clean and responsive interface.

## Live Demo

**Frontend:** https://customer-support-crm-sooty.vercel.app/

**Backend API:** https://customer-support-crm-skcy.onrender.com

**API Documentation:** https://customer-support-crm-skcy.onrender.com/docs

---

## Project Overview

Customer Support CRM is a ticket management system designed to streamline customer issue tracking and resolution.

The application enables support agents to:

* Create support tickets
* View and manage all tickets
* Search tickets by customer information or issue details
* Filter tickets by status
* Update ticket status
* Add notes to tickets
* Delete tickets
* Monitor ticket statistics through a dashboard

The project was developed as a full-stack web application with a REST API backend and a responsive React frontend.

---

## Features

### Dashboard

* View total tickets
* View open tickets
* View tickets in progress
* View closed tickets

### Ticket Management

* Create new support tickets
* View all tickets
* Open individual ticket details
* Update ticket status
* Delete tickets

### Search & Filter

* Search by:

  * Ticket ID
  * Customer name
  * Customer email
  * Issue title
  * Description
* Filter tickets by:

  * Open
  * In Progress
  * Closed

### Notes System

* Add notes to tickets
* View ticket history and updates
* Timestamped notes

### User Experience

* Responsive interface
* Toast notifications
* Clean dashboard layout
* Status badges with visual indicators

---

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* React Hot Toast
* Vite

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* SQLite
* Uvicorn

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```text
customer-support-crm/
│
├── backend/
│   ├── app/
│   │   ├── db/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/saltfry/customer-support-crm.git
cd customer-support-crm
```

---

### 2. Backend Setup

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate:

**Windows**

```bash
venv\Scripts\activate
```

**Mac/Linux**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Dashboard

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | `/dashboard/stats` | Dashboard statistics |

### Tickets

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/tickets`             | Get all tickets      |
| POST   | `/tickets`             | Create ticket        |
| GET    | `/tickets/{ticket_id}` | Get ticket details   |
| PUT    | `/tickets/{ticket_id}` | Update ticket status |
| DELETE | `/tickets/{ticket_id}` | Delete ticket        |

### Search & Filter

| Method | Endpoint                      |
| ------ | ----------------------------- |
| GET    | `/tickets/search?q=query`     |
| GET    | `/tickets/filter?status=Open` |

### Notes

| Method | Endpoint                     |
| ------ | ---------------------------- |
| POST   | `/tickets/{ticket_id}/notes` |

---

## Screenshots

### Dashboard

<img width="1536" height="700" alt="Screenshot 2026-06-13 185801" src="https://github.com/user-attachments/assets/9fe6b3b4-3594-4703-abb0-9f2dc3607b32" />

### Tickets Page

<img width="1536" height="702" alt="Screenshot 2026-06-13 185637" src="https://github.com/user-attachments/assets/2ac89f53-3e77-4b2a-bef3-eca191c46578" />

### Ticket Details

<img width="1536" height="702" alt="Screenshot 2026-06-13 185711" src="https://github.com/user-attachments/assets/7344be4c-0dad-48e7-b7a7-bca6a210b8df" />

<img width="1533" height="700" alt="Screenshot 2026-06-13 185734" src="https://github.com/user-attachments/assets/cca21a36-383d-44b7-a137-05e0ef5581d5" />

### Create Ticket

<img width="1536" height="701" alt="Screenshot 2026-06-13 185818" src="https://github.com/user-attachments/assets/18182c86-102d-4486-9cd6-02dfef9a39c9" />

---

## Future Improvements

* User authentication
* Role-based access control
* Email notifications
* File attachments
* PostgreSQL integration
* Note deletion and editing
* Ticket assignment system
* Analytics dashboard

---

## Author

**Sanika**

GitHub: https://github.com/saltfry

---

## License

This project was developed for educational and assessment purposes.
