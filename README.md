# 📌 Todo Full-Stack Web Application

A modern, responsive, and fully functional Full-Stack Todo Application built using Next.js (Frontend) and FastAPI (Backend).
This project includes User Authentication, Task CRUD Operations, and a beautiful animated UI.

## 🚀 Tech Stack

### Frontend

* Next.js 14 (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Fully responsive UI

### Backend

* FastAPI
* SQLModel
* PostgreSQL / SQLite
* JWT Authentication
* Passlib (bcrypt)

## 🔐 Features

### Authentication

* Sign Up
* Login
* Forgot Password
* JWT Token Authentication
* Secure token storage

### Task Management

* Create Task
* Read Tasks
* Update Task
* Delete Task

* Clean API endpoints
* Smooth animations

## UI Features

* Professional and modern design
* Animated components
* Fully responsive for mobile, tablet, desktop

## 📂 Project Structure
.
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── styles/
│
└── backend/
    ├── main.py
    ├── models/
    ├── routes/
    ├── auth/
    ├── database.py
    ├── pyproject.toml
    └── README.md

## 🛠 Installation & Setup
``` Clone the Repository
git clone https://github.com/AyeshaNasirWebDeveloper/Todo-Full-Stack-Web-Application.git
cd Todo-Full-Stack-Web-Application 
```

## ⚙️ Backend Setup (FastAPI)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Backend will run on:
http://localhost:8000

## 💻 Frontend Setup (Next.js)
cd frontend
npm install
npm run dev


Frontend will run on:
http://localhost:3000

## 🌐 Deployment

* Frontend
* Deployed on Vercel
* Backend

* Compatible with:

* Vercel (Serverless)
* Render
* Railway
* Docker

## 🧪 API Endpoints

Authentication
Method	Endpoint	Description
POST	/signup	Register user
POST	/login	Login user
POST	/forgot-password	Reset password
Tasks
Method	Endpoint	Description
GET	/tasks	Fetch all tasks
POST	/tasks	Create task
PUT	/tasks/{id}	Update task
DELETE	/tasks/{id}	Delete task

## 🤝 Contributing

Pull requests are welcome!
For major updates, open an issue first to discuss changes.

## 📜 License

This project is licensed under the MIT License.

## 🌟 Support the Project

If you found this helpful:

* ⭐ Star the repo
* 🍴 Fork it
* 🐛 Report issues

❤️Thank You for Visiting!❤️