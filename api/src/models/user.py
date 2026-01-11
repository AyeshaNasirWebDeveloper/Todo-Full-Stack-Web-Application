from typing import Optional
from sqlmodel import Field, SQLModel
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    # is_active: bool = Field(default=True)
    # is_active: bool | None = Field(default=True)
    is_active: bool = Field(default=True, nullable=False)

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

    def set_password(self, password: str):
        self.hashed_password = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hashed_password)

class UserCreate(UserBase):
    password: str

class UserPublic(UserBase):
    id: int

