'use client';

import { Task } from '../../redux/slices/taskSlice';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Pencil, Trash2, Calendar } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const getDaysUntilDue = (dueDate: string): { days: number; text: string; color: string } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return {
      days: diffDays,
      text: `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`,
      color: 'text-red-600 bg-red-50'
    };
  } else if (diffDays === 0) {
    return {
      days: diffDays,
      text: 'Due today',
      color: 'text-orange-600 bg-orange-50'
    };
  } else if (diffDays === 1) {
    return {
      days: diffDays,
      text: 'Due tomorrow',
      color: 'text-yellow-600 bg-yellow-50'
    };
  } else if (diffDays <= 7) {
    return {
      days: diffDays,
      text: `Due in ${diffDays} days`,
      color: 'text-blue-600 bg-blue-50'
    };
  } else {
    return {
      days: diffDays,
      text: `Due in ${diffDays} days`,
      color: 'text-gray-600 bg-gray-50'
    };
  }
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const statusVariant =
    task.status === 'done'
      ? 'success'
      : task.status === 'in-progress'
      ? 'warning'
      : 'default';

  const priorityVariant =
    task.priority === 'high'
      ? 'error'
      : task.priority === 'low'
      ? 'default'
      : 'warning';

  const priorityLabel = task.priority 
    ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
    : 'Medium';

  const statusLabel = task.status === 'todo' ? 'To Do' : 
    task.status === 'in-progress' ? 'In Progress' : 'Done';

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {task.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {task.description || 'No description provided.'}
        </p>

        <div className="flex items-center gap-2">
          <Badge variant={priorityVariant} className="text-xs">
            {priorityLabel}
          </Badge>
          <Badge variant={statusVariant} className="text-xs">
            {statusLabel}
          </Badge>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            <span className={`px-2 py-1 rounded-md font-medium ${getDaysUntilDue(task.dueDate).color}`}>
              {getDaysUntilDue(task.dueDate).text}
            </span>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
            aria-label="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
