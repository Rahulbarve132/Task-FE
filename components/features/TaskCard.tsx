import Link from 'next/link';
import { Task } from '../../redux/slices/taskSlice';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, ArrowRight } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const statusVariant =
    task.status === 'done'
      ? 'success'
      : task.status === 'in-progress'
      ? 'warning'
      : 'default';

  return (
    <Link href={`/tasks/${task.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {task.title}
          </h3>
          <Badge variant={statusVariant}>{task.status}</Badge>
        </div>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {task.description || 'No description provided.'}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
        </div>
      </Card>
    </Link>
  );
}
