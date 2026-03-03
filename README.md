# To-Do Application Modernization

This repository contains a modern, full-stack To-Do list application rebuilt with a React/Vite frontend and a Node.js/SQLite backend, all orchestrated seamlessly with Docker Compose.

## Key Features
- **Frontend**: A vibrant, modern UI built with React, Vite, and aesthetic Vanilla CSS featuring glassmorphism design.
- **Backend**: A lightweight Express.js API managing CRUD operations.
- **Database**: SQLite used for persistent local storage of To-Dos.
- **Containerization**: Fully dockerized with a quick `docker-compose` setup.

## Getting Started

### Prerequisites
Make sure you have Docker and Docker Compose installed on your system.

### Quick Start
1. Clone the repository and navigate to the project directory:
   ```bash
   cd todoList
   ```
2. Build and start the containers using Docker Compose:
   ```bash
   docker compose up -d --build
   ```
3. Open your browser and navigate to:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001/api/todos`

### Stopping the app
To stop the running containers, simply run:
```bash
docker compose down
```

For more detailed development instructions, please refer to [development.md](development.md).
