from fastapi import FastAPI
from src.database import create_db_and_tables
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env file
load_dotenv()

from src.api.v1.auth import router as auth_router
from src.api.v1.tasks import tasks_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(tasks_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    print("Application startup")
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to Ayesha's Todo App Phase II Backend!"}
