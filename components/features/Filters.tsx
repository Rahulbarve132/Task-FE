'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFilters } from '../../redux/slices/taskSlice';
import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

export function Filters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.tasks);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
        />
      </div>
      <div className="w-full sm:w-48">
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          value={filters.status}
          onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
