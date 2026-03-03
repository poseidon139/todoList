# Development Guide

This guide provides instructions on how to comfortably develop, test, and contribute to the modernized To-Do List Application.

## Project Structure
```
todoList/
├── backend/                  # Node.js + Express backend
│   ├── package.json          # Backend dependencies
│   ├── server.js             # API entrypoint + DB logic
│   └── Dockerfile            # Container configuration for backend
├── frontend/                 # React + Vite frontend
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite build configuration
│   ├── src/                  # React components and glassmorphism CSS
│   └── Dockerfile            # Container configuration for frontend
└── docker-compose.yml        # Orchestration file
```

## Running Locally Without Docker
If you'd prefer to run the applications natively for faster local feedback:

### Backend
1. Open a terminal and navigate to the `backend/` directory.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev` (Starts on `http://localhost:5000`)

### Frontend
1. Open a new terminal and navigate to the `frontend/` directory.
2. Install dependencies: `npm install`
3. Start Vite's fast dev server: `npm run dev` (Starts on `http://localhost:5173`)

## Database Adjustments
The app currently uses a local `database.sqlite` file located inside the `backend/` directory. Because the docker compose orchestrates this via volumes, your data stays persistent across container restarts.

### Modifying Schema
If you need to change the To-Do schema, edit the `CREATE TABLE` query within `backend/server.js`. For any complex migrations, consider adding a library like `knex` or writing local migration scripts.
