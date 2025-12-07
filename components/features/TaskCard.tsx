'use client';

import { Task } from '../../redux/slices/taskSlice';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Pencil, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

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
