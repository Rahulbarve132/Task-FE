'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleCreateModal, addTask, setTaskLoading, setTaskError } from '../../redux/slices/taskSlice';
import { taskService } from '../../services/taskService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CreateTaskModal() {
  const dispatch = useDispatch();
  const { isCreateModalOpen, isLoading } = useSelector((state: RootState) => state.tasks.uiState);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setTaskLoading(true));
    try {
      const newTask = await taskService.createTask({ title, description, status, priority });
      dispatch(addTask(newTask));
      dispatch(setTaskLoading(false));
      dispatch(toggleCreateModal(false));
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
    } catch (error: any) {
      dispatch(setTaskError(error.message || 'Failed to create task'));
    }
  };

  if (!isCreateModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Create New Task</h2>
            <button
              onClick={() => dispatch(toggleCreateModal(false))}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-gray-900 bg-white"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-gray-900 bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-gray-900 bg-white"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <Button type="button" variant="secondary" onClick={() => dispatch(toggleCreateModal(false))}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Create Task
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
