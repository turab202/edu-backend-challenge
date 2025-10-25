# Edu Backend Challenge

## Description
A small backend system that can:
1. Create a user
2. Save user progress
3. Get all progress data
Includes optional offline caching.

## Stack
- Node.js + Express
- SQLite database
- Local offline caching

## Installation
1. Clone the repo
2. Run `npm install`
3. Start server: `node server.js`
4. Server runs at `http://localhost:5000`

## API Endpoints
- **POST /api/users** → Create a new user  
  Body: `{ "name": "Amina" }`

- **POST /api/progress** → Save user progress  
  Body: `{ "user_id": 1, "lesson": "Math 1", "score": 90 }`

- **GET /api/progress** → Get all progress

## Offline Mode (Bonus)
- Saves progress locally if database is unavailable
- Syncs automatically when server restarts
