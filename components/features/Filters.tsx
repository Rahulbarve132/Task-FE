'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFilters } from '../../redux/slices/taskSlice';
import { Input } from '../ui/Input';
import { Search } from 'lucide-react';

export function Filters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.tasks);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setFilters({ search: searchTerm }));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, dispatch]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-48">
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-gray-900 bg-white"
          value={filters.status}
          onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="w-full sm:w-48">
        <select
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border text-gray-900 bg-white"
          value={filters.priority}
          onChange={(e) => dispatch(setFilters({ priority: e.target.value }))}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}
