# 🗂️ Health360 Task Manager

A fullstack Task Manager application built with **Angular** (frontend) and **NestJS** (backend) in a monorepo setup. Designed for managing tasks efficiently with features like creation, status updates, deletion, and filtering.

---

## 🛠 Project Structure

```
root/
├── task-manager-client/   # Angular frontend
├── task-manager-api/      # NestJS backend
└── package.json           # Monorepo scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm
- Angular CLI (`npm install -g @angular/cli`)

### Installation

Clone the repo:

```bash
git clone https://github.com/Ueetim/task-manager.git
cd task-manager
```

Install dependencies for both frontend and backend:

```bash
cd task-manager-client && npm install
cd ../task-manager-api && npm install
cd ..
```

Alternatively, run this from the root to install both:

```bash
npm run install:all
```

### Run both frontend and backend

```bash
npm start
```

This runs:
- Angular frontend at: `http://localhost:4200`
- NestJS backend at: `http://localhost:3000`

---

## 🌐 Backend — NestJS API

Located in `task-manager-api/`

### Features

- RESTful API with endpoints to create, retrieve, update, and delete tasks.
- In-memory or JSON-based data persistence.
- Validation and error handling using NestJS pipes and exceptions.
- CORS enabled for Angular frontend access.

### Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/tasks`                | Get all tasks                   |
| GET    | `/tasks/:id`            | Get task by ID                  |
| POST   | `/tasks`                | Create a new task               |
| PATCH  | `/tasks/:id/status`     | Update task status              |
| DELETE | `/tasks/:id`            | Delete task                     |

---

## 💻 Frontend — Angular App

Located in `task-manager-client/`

### Features

- Task List view with filtering (All, Open, In Progress, Done)
- Reactive form to create a task (with validation)
- Ability to update task status via dropdown
- Delete task with confirmation
- Global error handling for API failures
- Tailwind CSS for basic responsive UI styling

---

## 📦 Scripts

Run from the root folder:

| Script                   | Description                      |
|--------------------------|----------------------------------|
| `npm start`              | Run both frontend and backend    |
| `npm run start:frontend` | Run Angular frontend only        |
| `npm run start:backend`  | Run NestJS backend only          |
| `npm run install:all`    | Install dependencies in both apps|

---

## 🧪 Technologies Used

- Angular 19
- NestJS
- TypeScript
- Tailwind CSS
- Concurrently (for parallel scripts)

---

## 📁 Repository Info

- **Repository:** [https://github.com/Ueetim/task-manager](https://github.com/Ueetim/task-manager)
- **Issues:** [Open an Issue](https://github.com/Ueetim/task-manager/issues)

---

## 📃 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgements

This project was created as part of the technical assignment for the **Fullstack Software Engineer** role at **Health360**.