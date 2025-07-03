# CodeSpark

A full-stack code-sharing platform with authentication and a code editor.

## Project Structure

- `frontend/` — React app (user interface)
- `backend/` — Node.js/Express API (authentication, user management, code execution)

## Prerequisites
- Node.js & npm
- MongoDB (local or cloud)

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env # or create your own .env file
npm install
npm start
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

## Features
- User registration & login
- JWT authentication
- Code editor page (coming soon)

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT tokens
- `PORT` — Backend server port (default: 5000)

---

Feel free to extend this project with more features! 