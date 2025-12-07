'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTasks, setTaskLoading, setTaskError, toggleCreateModal } from '../../redux/slices/taskSlice';
import { taskService } from '../../services/taskService';
import ProtectedRoute from '../../components/layout/ProtectedRoute';
import { Navbar } from '../../components/layout/Navbar';
import { Filters } from '../../components/features/Filters';
import { TaskCard } from '../../components/features/TaskCard';
import { CreateTaskModal } from '../../components/features/CreateTaskModal';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { tasks, filters, uiState } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const fetchTasks = async () => {
      dispatch(setTaskLoading(true));
      try {
        const data = await taskService.getTasks({
          status: filters.status || undefined,
          search: filters.search || undefined,
        });
        dispatch(setTasks(data));
      } catch (error: any) {
        dispatch(setTaskError(error.message || 'Failed to fetch tasks'));
      } finally {
        dispatch(setTaskLoading(false));
      }
    };

    fetchTasks();
  }, [filters.status, filters.search]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
            <Button onClick={() => dispatch(toggleCreateModal(true))}>
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

          {(!tasks || tasks.length === 0) ? (
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
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </main>
        <CreateTaskModal />
      </div>
    </ProtectedRoute>
  );
}
