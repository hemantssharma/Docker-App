# Docker-App: Chat Application

This project is a **full-stack chat application** with a **frontend** (React) and **backend** (Node.js/Express), fully containerized using Docker. You can run the app locally or deploy the Docker images to any container registry.

---

## Table of Contents

1. [Project Structure](#project-structure)  
2. [Prerequisites](#prerequisites)  
3. [Docker Installation](#docker-installation)  
4. [Docker Setup](#docker-setup)  
5. [Docker Commands](#docker-commands)  
6. [Docker Compose](#docker-compose)  
7. [Running the App](#running-the-app)  
8. [Project Structure](#project-structure-detailed)  

---

## Project Structure

```

📁 Docker-App
└── 📁 chat-app
├── 📁 chat-backend
│   ├── package.json
│   ├── index.js
│   └── Dockerfile
├── 📁 chat-frontend
│   ├── package.json
│   ├── Dockerfile
│   ├── 📁 public
│   │   └── index.html
│   └── 📁 src
│       ├── index.js
│       ├── App.js
│       └── App.css
└── docker-compose.yml

````

---

## Prerequisites

- Git  
- Node.js & npm (optional if building locally)  
- Docker & Docker Compose  

---

## Docker Installation

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install docker.io
```

### Docker compose installaion
```bash
sudo mkdir -p /usr/lib/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-linux-x86_64 \
     -o /usr/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/lib/docker/cli-plugins/docker-compose

docker compose version


````

### MacOS

Install **Docker Desktop** from [docker.com](https://www.docker.com/products/docker-desktop)

### Windows

Install **Docker Desktop** from [docker.com](https://www.docker.com/products/docker-desktop)

---

## Docker Setup

Allow Docker commands without `sudo`:

```bash
sudo groupadd docker        # Create docker group
sudo usermod -aG docker $USER
newgrp docker               # Apply changes
docker run hello-world      # Verify Docker installation
```

---

## Docker Commands

### Login to Docker Hub

```bash
docker login
# Enter your Docker Hub username and password
```

### Build Docker Images

**Backend**

```bash
cd chat-backend
docker build -t chat-backend:latest .
```

**Frontend**

```bash
cd ../chat-frontend
docker build -t chat-frontend:latest .
```

### Push Docker Images to Docker Hub

```bash
docker tag chat-backend:latest <your-username>/chat-backend:latest
docker tag chat-frontend:latest <your-username>/chat-frontend:latest

docker push <your-username>/chat-backend:latest
docker push <your-username>/chat-frontend:latest
```

### Pull Docker Images from Docker Hub

```bash
docker pull <your-username>/chat-backend:latest
docker pull <your-username>/chat-frontend:latest
```

---

## Docker Compose

### Start Services

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### Build and Start Services

```bash
docker-compose up -d --build
```

### View Logs

```bash
docker-compose logs -f
```

### List Running Containers

```bash
docker-compose ps
```

---

## Running the App Locally

1. Make sure Docker and Docker Compose are running.
2. From the project root:

```bash
docker-compose up -d --build
```

3. Open your browser:

   * Frontend: `http://localhost:3000`
   * Backend API: `http://localhost:5000` (or as configured)

---

## Notes

* Ensure ports in `docker-compose.yml` match your local environment.
* Environment variables can be added in a `.env` file and referenced in the Compose file.
* To rebuild images after code changes:

```bash
docker-compose up -d --build
```

---

**Your chat app is now containerized and ready to deploy!**

