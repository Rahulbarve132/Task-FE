'use client';

import { Card } from '../ui/Card';

export function TaskSkeleton() {
  return (
    <Card className="p-4">
      <div className="space-y-4 animate-pulse">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        
        {/* Badges skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Actions skeleton */}
        <div className="flex justify-end pt-2">
           <div className="h-6 w-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </Card>
  );
}
