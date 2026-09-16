# Task Manager App

## Backend Setup
1. cd backend
2. npm install
3. npm start (runs on port 4000)

## Frontend Setup
1. cd frontend
2. npm install
3. npm run dev (runs on port 3000)

## API Endpoints
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task
- PATCH /api/tasks/:id/toggle - Toggle completed status

## Design Decisions
- Used plain CSS for styling as requested, without any external frameworks.
- The endless carousel is built using standard React state and CSS `transform: translateX` to create smooth transitions.
- Task editing is implemented inline directly inside the task card to keep the code simple and avoid complex modals.

## Time Spent
- Backend: 1 hour
- Frontend (React + Carousel): 2 hours
- Styling: 30 minutes
- Bug fixing: 30 minutes