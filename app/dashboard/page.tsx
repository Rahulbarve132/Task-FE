'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTasks, setTaskLoading, setTaskError, toggleCreateModal, Task, removeTask } from '../../redux/slices/taskSlice';
import { taskService } from '../../services/taskService';
import ProtectedRoute from '../../components/layout/ProtectedRoute';
import { Navbar } from '../../components/layout/Navbar';
import { Filters } from '../../components/features/Filters';
import { TaskCard } from '../../components/features/TaskCard';
import { CreateTaskModal } from '../../components/features/CreateTaskModal';
import { EditTaskModal } from '../../components/features/EditTaskModal';
import { TaskSkeleton } from '../../components/features/TaskSkeleton';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { tasks, filters, uiState } = useSelector((state: RootState) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(setTaskLoading(true));
      try {
        const data = await taskService.getTasks({
          status: filters.status || undefined,
          search: filters.search || undefined,
          priority: filters.priority || undefined,
        });
        dispatch(setTasks(data));
      } catch (error: any) {
        dispatch(setTaskError(error.message || 'Failed to fetch tasks'));
      } finally {
        dispatch(setTaskLoading(false));
      }
    };

    fetchTasks();
  }, [filters.status, filters.search, filters.priority]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskService.deleteTask(id);
      dispatch(removeTask(id));
    } catch (error: any) {
      dispatch(setTaskError(error.message || 'Failed to delete task'));
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your tasks and track progress.</p>
            </div>
            <Button onClick={() => dispatch(toggleCreateModal(true))} className="bg-black hover:bg-gray-800 text-white">
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Button>
          </div>

          <Filters />

          {uiState.error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              {uiState.error}
            </div>
          )}

          {uiState.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <TaskSkeleton key={index} />
              ))}
            </div>
          ) : (!tasks || tasks.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tasks found.</p>
              <Button
                variant="ghost"
                className="mt-4 text-indigo-600"
                onClick={() => dispatch(toggleCreateModal(true))}
              >
                Create your first task
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(tasks) && tasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </main>
        <CreateTaskModal />
        <EditTaskModal 
          task={editingTask} 
          isOpen={editingTask !== null} 
          onClose={() => setEditingTask(null)} 
        />
      </div>
    </ProtectedRoute>
  );
}
