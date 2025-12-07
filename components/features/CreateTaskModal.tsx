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
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setTaskLoading(true));
    try {
      const newTask = await taskService.createTask({ title, description, status, priority, dueDate: dueDate || undefined });
      dispatch(addTask(newTask));
      dispatch(setTaskLoading(false));
      dispatch(toggleCreateModal(false));
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate('');
    } catch (error: any) {
      dispatch(setTaskError(error.message || 'Failed to create task'));
    }
  };

  if (!isCreateModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Fixed Header */}
          <div className="flex justify-between items-center px-6 py-5 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-900">Create New Task</h2>
            <button
              onClick={() => dispatch(toggleCreateModal(false))}
              className="text-gray-400 hover:text-gray-600 transition-all hover:rotate-90 duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto flex-1 bg-white">
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
              />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="block w-full rounded-xl bg-gray-50 shadow-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 border-0 text-gray-900 transition-all placeholder:text-gray-400"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    className="block w-full rounded-xl bg-gray-50 shadow-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 border-0 text-gray-900 transition-all cursor-pointer"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select
                    className="block w-full rounded-xl bg-gray-50 shadow-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 border-0 text-gray-900 transition-all cursor-pointer"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  className="block w-full rounded-xl bg-gray-50 shadow-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 border-0 text-gray-900 transition-all cursor-pointer"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Fixed Footer */}
          <div className="px-6 py-5 flex justify-end space-x-3 flex-shrink-0 bg-gradient-to-r from-white to-gray-50">
            <Button type="button" variant="secondary" onClick={() => dispatch(toggleCreateModal(false))}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={isLoading} 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
            >
              Create Task
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
