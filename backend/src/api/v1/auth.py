from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from backend.src.database import engine
from backend.src.models.user import User, UserCreate, UserPublic
from typing import Optional
from datetime import datetime, timedelta
from jose import jwt
from backend.src.middleware.auth import BETTER_AUTH_SECRET, ALGORITHM

router = APIRouter()

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Needs to be configurable via env vars

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, BETTER_AUTH_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/signup", response_model=UserPublic)
def register_user(user_create: UserCreate):
    with Session(engine) as session:
        existing_user = session.query(User).filter(User.email == user_create.email).first()
        if existing_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

        user = User(email=user_create.email)
        user.set_password(user_create.password)

        session.add(user)
        session.commit()
        session.refresh(user)
        return user

@router.post("/login")
def login_user(user_create: UserCreate):
    with Session(engine) as session:
        user = session.query(User).filter(User.email == user_create.email).first()
        if not user or not user.verify_password(user_create.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id)}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
