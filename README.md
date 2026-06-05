# Task Management System

A full-stack Task Management System with JWT authentication, task CRUD, search/filter, and progress tracking.

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Joi, JWT
- **Frontend:** React (Vite), Tailwind CSS, Axios, React Router

## Features

- User registration and login with JWT
- Protected task APIs per authenticated user
- Task CRUD (create, read, update, delete)
- Search tasks by title/description
- Filter tasks by status: `Pending`, `In Progress`, `Completed`
- Task completion progress percentage
- Responsive UI with loading and error states

## Project Structure

```text
task-management-system/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── searchFilter.js
│   │   └── validation.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── SearchFilter.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks (JWT required)
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Local Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Update `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_management_system
JWT_SECRET=replace_with_secure_secret
```

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Build Commands

- Backend start: `npm start` (inside `backend`)
- Frontend lint: `npm run lint` (inside `frontend`)
- Frontend production build: `npm run build` (inside `frontend`)

## Deployment Notes

- Use a managed MongoDB URI in production.
- Set a strong `JWT_SECRET`.
- Configure CORS origin(s) for your deployed frontend URL.
- Set `VITE_API_URL` to deployed backend API base URL.
