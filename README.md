Project

Name: E-commerce Project (React, Django)
Description: A full-stack e-commerce web app with a Django REST API backend and a React frontend. Features product listing, product detail, cart, checkout, user authentication, profile, and order management.
Features

Products: list, detail, create/edit (admin)
Cart: add/remove items, quantity updates
Checkout: shipping, payment placeholder, order creation
Users: register, login, profile, admin user management
Orders: place, view, admin list/detail
Tech Stack

Backend: Django + Django REST Framework (API) — see settings.py
Frontend: React (Create React App) — see package.json
Database: SQLite (included at db.sqlite3) for development
Repository Structure

Backend root: manage.py — Django project entry
Django app: base — models, serializers, views, urls, migrations
Frontend root: src — React app components, screens, actions, reducers, store


Quick Setup (local)

Backend: create a virtualenv and install dependencies

python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt

Frontend: install Node deps
cd frontend
npm install

Run 
Django server
cd backend
python manage.py runserver

React dev server
cd frontend
npm start

Run backend and frontend in separate terminals; frontend defaults to http://localhost:3000 and backend to http://127.0.0.1:8000.



