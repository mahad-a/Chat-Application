# Chat Application

## Project Overview

This chat application serves as a demonstration of building a **full-stack web application**. It showcases the use of **React (TypeScript)** for the frontend, **Django (Python)** for the backend, and **PostgreSQL** for the database, all running in **Docker containers**. The goal of this project is to demonstrate your ability to develop, containerize, and manage a web application. The code will be made available publicly, and the project might eventually be deployed to cloud platforms like **AWS**.

Future features, such as user profile support with images/avatars, will be added as the application evolves.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Planned Future Features](#planned-future-features)
5. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Setting Up the Project Locally](#setting-up-the-project-locally)
    3. [Stopping the Containers](#stopping-the-containers)
6. [Project Structure](#project-structure)
7. [Database Setup](#database-setup)
8. [Running Tests](#running-tests)

## Technologies Used

- **Frontend**: 
  - React (TypeScript)
- **Backend**:
  - Python (Django)
  - PostgreSQL (Database)
- **Containerization**:
  - Docker (for containerizing backend, frontend, and database)

## Features

- **User Registration**: Users can register with their basic information.
- **Messaging**: Users can send and receive text messages.
- **Dockerized Application**: The entire application (frontend, backend, and database) is containerized using Docker for easy development and deployment.

## Planned Future Features

- **User Profiles**: Adding user profiles with image/avatars.
- **Deployment**: The application may eventually be deployed on **AWS** or another cloud platform.
- **Kubernetes**: The project will be deployed and managed with **Kubernetes** in the future.

## Getting Started

These instructions will help you get the project up and running on your local machine using Docker.

### Prerequisites

- **Docker**: Make sure Docker is installed and running on your machine. You can download Docker from [here](https://www.docker.com/get-started).
- **Docker Compose** (if you plan to use it): It is usually bundled with Docker.

### Setting Up the Project Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/chat-application.git
   cd chat-application
   ```

2. **Build and start the containers**:

   The project is set up with Docker containers for the backend, frontend, and database. To start the application, run the following command:

   ```bash
   docker-compose up --build
   ```

   This will build and start all the necessary services (backend, frontend, and PostgreSQL database) in their respective Docker containers.

3. **Access the application**:

   - **Frontend**: Open your browser and navigate to `http://localhost:3000` to access the frontend of the chat application.
   - **Backend**: The backend API will be accessible at `http://localhost:8000/api/`.

### Stopping the Containers

To stop all the running containers, use:

```bash
docker-compose down
```

This will stop and remove the containers.

## Project Structure

```
chat-application/
├── backend/                # Django project files
│   ├── Dockerfile           # Dockerfile for the backend
│   ├── manage.py            # Django project management
│   ├── ...
├── frontend/               # React project files
│   ├── Dockerfile           # Dockerfile for the frontend
│   ├── ...
├── db/                     # PostgreSQL database configuration
│   ├── init.sql             # Initialization SQL script for PostgreSQL
├── docker-compose.yml      # Docker Compose file to orchestrate the containers
└── README.md               # This file
```

## Database Setup

The PostgreSQL database will automatically be set up and initialized when you start the Docker containers. The **backend** is connected to the database via environment variables configured in `docker-compose.yml`.

## Running Tests

If you want to run tests for the Django backend, you can do so by running:

```bash
docker-compose exec backend python manage.py test
```
