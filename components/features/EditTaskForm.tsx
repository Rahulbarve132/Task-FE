'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateTask, setTaskLoading, setTaskError, Task } from '../../redux/slices/taskSlice';
import { taskService } from '../../services/taskService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RootState } from '../../redux/store';

interface EditTaskFormProps {
  task: Task;
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.tasks.uiState);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setTaskLoading(true));
    try {
      const updatedTask = await taskService.updateTask(task.id, { title, description, status });
      dispatch(updateTask(updatedTask));
      router.push('/dashboard');
    } catch (error: any) {
      dispatch(setTaskError(error.message || 'Failed to update task'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => router.push('/dashboard')}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
