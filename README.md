📋 MERN Task Manager
A full-stack Task Manager Application built with the MERN stack (MongoDB, Express.js, React, Node.js).
It allows users to register, log in, and manage their tasks — create, update, mark as complete, and delete tasks.
This project demonstrates user authentication, secure APIs, and a responsive frontend — suitable for learning and real-world use.

✨ Features
🔐 User Authentication

User registration and login with JWT (JSON Web Tokens)
Passwords hashed using bcrypt
✅ Task Management

Add new tasks
Edit tasks
Mark tasks as complete/incomplete
Delete tasks
📊 Dashboard

View all tasks in a clean, responsive UI
⚡ Technology Highlights

MongoDB Atlas for cloud-based database
Express.js & Node.js backend REST API
React (Vite) for modern frontend development
Axios for API requests
🛠 Tech Stack
Frontend: React (Vite), Axios, TailwindCSS (optional styling)
Backend: Node.js, Express.js, JWT, bcrypt
Database: MongoDB Atlas
Authentication: JWT (access tokens)
📦 Installation & Setup
Follow these steps to run the project locally:

1️⃣ Clone the repository
git clone https://github.com/Salotagiabhishek/Task-Manager.git
cd Task-Manager
2️⃣ Backend Setup

Navigate to the backend folder:

cd backend
npm install


Create a .env file inside backend/ with the following variables:

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Start the backend server:

npm run dev


By default, the backend runs on:
👉 http://localhost:5000

3️⃣ Frontend Setup

Open a new terminal, then:

cd frontend
npm install



const API_URL = "http://localhost:5000/api";
export default API_URL;


Start the React app:

npm run dev


The frontend will run on:
👉 http://localhost:5173 (by default with Vite)

4️⃣ Test the App

Register a new account

Log in with your credentials

Start adding, editing, and deleting tasks 🚀

🌍 Deployment

Backend: Render
 (free Node.js hosting)

Frontend: Vercel
 or Netlify

Database: MongoDB Atlas

Deployment Notes

Replace http://localhost:5000 with your live backend URL in the frontend config.

Ensure your backend .env variables are set in your hosting provider (Render/Heroku/etc).


## 📸 Screenshots

### 🔐 Login Page
![Login Page](./screenshots/Screenshot%202025-09-30%20012616.png)

### 📝 Register Page
![Register Page](./screenshots/Screenshot%202025-09-30%20012627.png)

### 📋 Dashboard
![Dashboard](./screenshots/Screenshot%202025-09-30%20012651.png)

### ➕ Add Task
![Add Task](./screenshots/Screenshot%202025-09-30%20012702.png)

### ✅ Task List
![Task List](./screenshots/Screenshot%202025-09-30%20012711.png)

### ⚙️ Profile/Settings
![Profile Settings](./screenshots/Screenshot%202025-09-30%20012721.png)




👨‍💻 Author

Developed by Abhishek Salotagi

📧 Email: salotagiabhishek.email@example.com
Contact: 7204432169
