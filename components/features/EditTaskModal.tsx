'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Task, updateTask, setTaskError } from '../../redux/slices/taskSlice';
import { taskService } from '../../services/taskService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditTaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditTaskModal({ task, isOpen, onClose }: EditTaskModalProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>(task?.status || 'todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when task prop changes
  // Update local state when task prop changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority || 'medium');
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    setIsLoading(true);
    try {
      const updatedTaskData = await taskService.updateTask(task.id, {
        title,
        description,
        status,
        priority,
        dueDate: dueDate || undefined,
      });
      dispatch(updateTask(updatedTaskData));
      onClose();
    } catch (error: any) {
      dispatch(setTaskError(error.message || 'Failed to update task'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Fixed Header */}
          <div className="flex justify-between items-center px-8 py-6 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900">Edit Task</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-all hover:rotate-90 duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Scrollable Body */}
          <div className="overflow-y-auto flex-1 bg-white">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  required
                  className="text-base border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  className="block w-full rounded-xl bg-gray-50 shadow-sm focus:bg-white focus:ring-2 focus:ring-indigo-500/20 text-sm px-4 py-3 border-0 text-gray-900 resize-none transition-all placeholder:text-gray-400"
                  rows={4}
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
          <div className="px-8 py-6 flex justify-end space-x-3 flex-shrink-0 bg-gradient-to-r from-white to-gray-50">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={isLoading} 
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
