
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from src.database import get_session
from src.models.task import Task, TaskCreate, TaskPublic, TaskUpdate
from src.models.user import User
from src.middleware.auth import get_current_active_user

tasks_router = APIRouter(prefix="/tasks", tags=["tasks"])

@tasks_router.post("/", response_model=TaskPublic)
def create_task(*,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
    task: TaskCreate
) -> TaskPublic:
    db_task = Task.from_orm(task)
    db_task.owner_id = current_user.id
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@tasks_router.get("/", response_model=List[TaskPublic])
def read_tasks(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
) -> List[TaskPublic]:
    tasks = session.exec(select(Task).where(Task.owner_id == current_user.id)).all()
    return tasks


@tasks_router.get("/{task_id}", response_model=TaskPublic)
def read_task(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
    task_id: int
) -> TaskPublic:
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@tasks_router.put("/{task_id}", response_model=TaskPublic)
def update_task(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
    task_id: int,
    task: TaskUpdate
) -> TaskPublic:
    db_task = session.exec(
        select(Task).where(Task.id == task_id, Task.owner_id == current_user.id)
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    task_data = task.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@tasks_router.delete("/{task_id}")
def delete_task(
    *,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user),
    task_id: int
):
    task = session.exec(
        select(Task).where(Task.id == task_id, Task.owner_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"message": "Task deleted successfully"}
