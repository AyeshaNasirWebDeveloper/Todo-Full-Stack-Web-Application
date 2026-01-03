
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskList from '@/components/TaskList';
import { getToken, removeToken } from '@/utils/token';
import { TaskPublic } from '@/services/taskService';
import { getTasks, createTask, updateTask, deleteTask } from '@/services/taskService'; // Assuming you'll create this service

const TasksPage: React.FC = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskPublic[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [editingTask, setEditingTask] = useState<TaskPublic | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    fetchTasks();
  }, [router]);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      // Handle error, e.g., redirect to login if unauthorized
      if ((error as any).message === "Unauthorized") {
        removeToken();
        router.push('/login');
      }
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await createTask({ title: newTaskTitle });
      setNewTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task.");
    }
  };

  const handleUpdateTask = async (updatedTask: TaskPublic) => {
    try {
      await updateTask(updatedTask.id, { title: updatedTask.title, description: updatedTask.description, completed: updatedTask.completed });
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task.");
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task.");
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (taskToUpdate) {
      try {
        await updateTask(id, { completed });
        fetchTasks();
      } catch (error) {
        console.error("Failed to toggle task completion:", error);
        alert("Failed to toggle task completion.");
      }
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Tasks</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleCreateTask} className="mb-6 flex space-x-3">
          <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Add a new task"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Task
          </button>
        </form>

        {editingTask && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Edit Task</h3>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            />
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
              placeholder="Description (optional)"
              value={editingTask.description || ''}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            />
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                checked={editingTask.completed}
                onChange={(e) => setEditingTask({ ...editingTask, completed: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">Completed</label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateTask(editingTask)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
};

export default TasksPage;
