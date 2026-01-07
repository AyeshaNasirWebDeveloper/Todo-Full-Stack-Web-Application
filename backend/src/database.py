from sqlmodel import create_engine, Session, SQLModel, text
from typing import Generator
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set.")

# Create the database engine
engine = create_engine(DATABASE_URL, echo=True)

with engine.connect() as connection:
    result = connection.execute(text("SELECT VERSION();"))
    # print("Database version:", result.scalar())
    print("Successfully connected to the database.")

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session