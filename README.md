E-commerce Project (React + Django)

A full-stack e-commerce web application with a Django REST Framework backend and a React frontend.

Features

- Products: listing, detail pages, create/edit (admin)
- Cart: add/remove items, update quantities
- Checkout: shipping, payment placeholder, order creation
- Users: register, login, profiles, and admin user management
- Orders: place orders, view order history, admin order list/detail

Tech stack

- Backend: Django, Django REST Framework
- Frontend: React (Create React App)
- Database: SQLite (development)

Repository structure

- backend/: Django project (manage.py, project settings, app: `base`)
- frontend/: React app (src/, package.json)
- db.sqlite3: development database (committed for convenience)

Quick setup (local development)

Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

Backend (API)

1. Create and activate a virtual environment

   python -m venv .venv
   # Windows
   .venv\Scripts\activate
   # macOS / Linux
   source .venv/bin/activate

2. Install Python dependencies

   cd backend
   pip install -r requirements.txt

3. Apply migrations and create a superuser

   python manage.py migrate
   python manage.py createsuperuser

4. Run the development server

   python manage.py runserver

The backend will be available at http://127.0.0.1:8000 by default.

Frontend (React)

1. Install dependencies

   cd frontend
   npm install

2. Start the development server

   npm start

The frontend will run at http://localhost:3000 and should proxy API requests to the backend (if proxy is configured in package.json).
