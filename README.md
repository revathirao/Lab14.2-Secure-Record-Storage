## Project Overview

A secure, production-ready REST API that allows users to register, authenticate, and manage personal notes. Built with Node.js, Express, and MongoDB, using JWT-based authentication to protect user data.
This project demonstrates backend fundamentals including authentication, authorization, middleware, MVC architecture, and CRUD operations.
Real-world request flow (Auth → Middleware → Controller → DB)

## Features

User registration & login
Password hashing with bcrypt
JWT token generation & verification
Protected routes using authentication middleware
Create, read, update, and delete notes
MongoDB data persistence with Mongoose
Centralized error handling
Scalable folder structure

## Tech Stack

Node.js
Express
MongoDB
Mongoose
JWT (jsonwebtoken)
bcrypt
dotenv

## Project Structure

server/
│
├── controllers/
│ ├── userController.js
│ └── noteController.js
├── models/
│ ├── User.js
│ └── Note.js
├── routes/
│ ├── api/
│ │ ├── index.js
│ │ ├── userRoutes.js
│ │ └── noteRoutes.js
│ └── index.js
├── utils/
│ └── auth.js
├── db/
│ └── connection.js
├── server.js
├── .env
└── package.json

## Authentication Flow

User registers or logs in
Server generates a JWT
Token is sent with each protected request
Middleware verifies token and attaches user data to req.user
Authorization: Bearer <JWT_TOKEN>

## API Endpoints

# User Routes

Method Endpoint Description
POST /api/users/register Register new user
POST /api/users/login Login & receive JWT

# Notes Routes (Protected)

Method Endpoint Description
POST /api/notes Create a note
GET /api/notes Get user’s notes
GET /api/notes/:id Get single note
PUT /api/notes/:id Update note
DELETE /api/notes/:id Delete note

## Installation & Setup

1. Clone Repository
2. Install Dependencies
   npm install
3. Environment Variables
   Create a .env file:
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/notesDB
   JWT_SECRET=yourSecretKey
4. Run the Server
   node server.js
   Server runs at:
   http://localhost:3000

## Testing

Tested using Postman
JWT included in request headers for protected routes
Supports full CRUD lifecycle for notes

## Key Takeaways

Implemented secure authentication using JWT
Applied middleware pattern for route protection
Designed a scalable REST API
Strengthened backend debugging and API testing skills
