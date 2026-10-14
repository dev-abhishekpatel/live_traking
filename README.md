# School Bus Tracking System

A modern MERN stack school bus tracking app with role-based access for parents, drivers, admins, and staff.

## Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB-ready Mongoose models
- Realtime: Socket.IO
- Auth: JWT

## Project structure

- `client/` — React frontend
- `server/` — Express backend

## Quick start

1. Install dependencies:
   npm install
2. Create environment file:
   cp server/.env.example server/.env
3. Start the app:
   npm run dev

## Default roles

- Parent
- Driver
- Admin
- Staff

## API overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/health`
- `GET /api/buses`
- `GET /api/students`
- `GET /api/trips/active`
- `POST /api/trips/start`
- `POST /api/trips/stop`
- `GET /api/notifications`

## Deployment notes

The application is structured to be deployed using Vercel for the frontend and Render or Railway for the backend.
