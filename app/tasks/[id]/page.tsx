'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { RootState } from '../../../redux/store';
import { setSelectedTask, setTaskLoading, setTaskError, removeTask } from '../../../redux/slices/taskSlice';
import { taskService } from '../../../services/taskService';
import ProtectedRoute from '../../../components/layout/ProtectedRoute';
import { Navbar } from '../../../components/layout/Navbar';
import { EditTaskForm } from '../../../components/features/EditTaskForm';
import { Button } from '../../../components/ui/Button';
import { Loader } from '../../../components/ui/Loader';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedTask, uiState } = useSelector((state: RootState) => state.tasks);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (typeof params.id !== 'string') return;
      
      dispatch(setTaskLoading(true));
      try {
        const data = await taskService.getTask(params.id);
        dispatch(setSelectedTask(data));
        dispatch(setTaskLoading(false)); // Manual off since setSelectedTask doesn't do it
      } catch (error: any) {
        dispatch(setTaskError(error.message || 'Failed to fetch task'));
      }
    };

    fetchTask();
  }, [params.id]);

  const handleDelete = async () => {
    if (!selectedTask || !confirm('Are you sure you want to delete this task?')) return;
    
    setIsDeleting(true);
    try {
      await taskService.deleteTask(selectedTask.id);
      dispatch(removeTask(selectedTask.id));
      router.push('/dashboard');
    } catch (error: any) {
      alert('Failed to delete task');
      setIsDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            className="mb-6 pl-0 hover:bg-transparent hover:text-indigo-600"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          {uiState.isLoading ? (
            <Loader />
          ) : uiState.error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              {uiState.error}
            </div>
          ) : selectedTask ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  isLoading={isDeleting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
              <div className="p-6">
                <EditTaskForm task={selectedTask} />
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">Task not found</div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
