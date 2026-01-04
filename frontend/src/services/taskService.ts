import { getToken } from "../../src/utils/token";

const API_BASE_URL = 'http://localhost:8000'; // Replace with your backend URL

interface TaskBase {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface TaskCreate extends TaskBase {}

export interface TaskPublic extends TaskBase {
  id: number;
  owner_id: number;
}

export const getTasks = async (): Promise<TaskPublic[]> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch tasks');
  }

  return response.json();
};

export const createTask = async (task: TaskCreate): Promise<TaskPublic> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_BASE_URL}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to create task');
  }

  return response.json();
};

export const updateTask = async (id: number, task: Partial<TaskCreate>): Promise<TaskPublic> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update task');
  }

  return response.json();
};

export const deleteTask = async (id: number): Promise<{ message: string }> => {
  const token = getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete task');
  }

  return response.json();
};
