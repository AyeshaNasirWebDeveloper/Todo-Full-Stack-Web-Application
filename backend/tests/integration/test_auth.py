from fastapi.testclient import TestClient
from backend.api.main import app

client = TestClient(app)

def test_signup_user():
    response = client.post(
        "/signup",
        json={
            "email": "test@example.com",
            "password": "password123",
        },
    )
    assert response.status_code == 200 # This will fail until signup is implemented
    assert "id" in response.json()
    assert response.json()["email"] == "test@example.com"

def test_login_user():
    response = client.post(
        "/login",
        json={
            "email": "test@example.com",
            "password": "password123",
        },
    )
    assert response.status_code == 200 # This will fail until login is implemented
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

