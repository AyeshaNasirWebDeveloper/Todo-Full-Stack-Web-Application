from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

# Helper function to register and log in a user, and return their token
def get_auth_token(email: str = "test_crud@example.com", password: str = "password123") -> str:
    # Try to sign up, ignore if already exists
    client.post(
        "/signup",
        json={
            "email": email,
            "password": password,
        },
    )

    # Log in
    response = client.post(
        "/login",
        json={
            "email": email,
            "password": password,
        },
    )
    assert response.status_code == 200
    return response.json()["access_token"]

def test_create_task():
    token = get_auth_token()
    response = client.post(
        "/tasks",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "title": "My first task",
            "description": "This is a test task",
            "completed": False
        },
    )
    assert response.status_code == 200 # This will fail until create task is implemented
    assert "id" in response.json()
    assert response.json()["title"] == "My first task"
    assert response.json()["description"] == "This is a test task"
    assert response.json()["completed"] == False

def test_read_tasks():
    token = get_auth_token()
    # Create a task first
    create_response = client.post(
        "/tasks",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "title": "Task to read",
            "description": "Description to read",
            "completed": False
        },
    )
    assert create_response.status_code == 200
    task_id = create_response.json()["id"]

    # Test GET /tasks
    response_all = client.get(
        "/tasks",
        headers={
            "Authorization": f"Bearer {token}"
        },
    )
    assert response_all.status_code == 200
    assert len(response_all.json()) > 0
    assert any(task["id"] == task_id for task in response_all.json())

    # Test GET /tasks/{task_id}
    response_single = client.get(
        f"/tasks/{task_id}",
        headers={
            "Authorization": f"Bearer {token}"
        },
    )
    assert response_single.status_code == 200
    assert response_single.json()["id"] == task_id
    assert response_single.json()["title"] == "Task to read"

def test_update_task():
    token = get_auth_token()
    # Create a task first
    create_response = client.post(
        "/tasks",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "title": "Task to update",
            "description": "Original description",
            "completed": False
        },
    )
    assert create_response.status_code == 200
    task_id = create_response.json()["id"]

    # Update the task
    update_response = client.put(
        f"/tasks/{task_id}",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "title": "Updated task title",
            "description": "New description",
            "completed": True
        },
    )
    assert update_response.status_code == 200 # This will fail until update task is implemented
    assert update_response.json()["id"] == task_id
    assert update_response.json()["title"] == "Updated task title"
    assert update_response.json()["description"] == "New description"
    assert update_response.json()["completed"] == True

def test_delete_task():
    token = get_auth_token()
    # Create a task first
    create_response = client.post(
        "/tasks",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "title": "Task to delete",
            "description": "Description to delete",
            "completed": False
        },
    )
    assert create_response.status_code == 200
    task_id = create_response.json()["id"]

    # Delete the task
    delete_response = client.delete(
        f"/tasks/{task_id}",
        headers={
            "Authorization": f"Bearer {token}"
        },
    )
    assert delete_response.status_code == 200 # This will fail until delete task is implemented
    assert delete_response.json()["message"] == "Task deleted successfully"

    # Verify task is deleted
    get_response = client.get(
        f"/tasks/{task_id}",
        headers={
            "Authorization": f"Bearer {token}"
        },
    )
    assert get_response.status_code == 404 # This will fail until delete task is implemented
