
import React from 'react';

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  };
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <li className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, !task.completed)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span className={`ml-3 text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {task.title}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(task.id)}
          className="px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
