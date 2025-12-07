'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setFilters } from '../../redux/slices/taskSlice';
import { Input } from '../ui/Input';
import { Search, Calendar, X } from 'lucide-react';

export function Filters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.tasks);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [filterMode, setFilterMode] = useState<'all' | 'specific' | 'range' | 'overdue' | 'upcoming'>('all');

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setFilters({ search: searchTerm }));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, dispatch]);

  const handleFilterModeChange = (mode: typeof filterMode) => {
    setFilterMode(mode);
    // Clear all date filters when changing mode
    dispatch(setFilters({ 
      dueDate: '', 
      dueDateFrom: '', 
      dueDateTo: '', 
      overdue: '', 
      upcoming: '' 
    }));
  };

  const handleSpecificDateChange = (date: string) => {
    dispatch(setFilters({ 
      dueDate: date,
      dueDateFrom: '',
      dueDateTo: '',
      overdue: '',
      upcoming: ''
    }));
  };

  const handleDateRangeChange = (from: string, to: string) => {
    dispatch(setFilters({ 
      dueDate: '',
      dueDateFrom: from,
      dueDateTo: to,
      overdue: '',
      upcoming: ''
    }));
  };

  const handleOverdueChange = (isOverdue: boolean) => {
    dispatch(setFilters({ 
      dueDate: '',
      dueDateFrom: '',
      dueDateTo: '',
      overdue: isOverdue ? 'true' : '',
      upcoming: ''
    }));
  };

  const handleUpcomingChange = (days: string) => {
    dispatch(setFilters({ 
      dueDate: '',
      dueDateFrom: '',
      dueDateTo: '',
      overdue: '',
      upcoming: days
    }));
  };

  const clearDateFilters = () => {
    setFilterMode('all');
    dispatch(setFilters({ 
      dueDate: '', 
      dueDateFrom: '', 
      dueDateTo: '', 
      overdue: '', 
      upcoming: '' 
    }));
  };

  const hasActiveDateFilter = filters.dueDate || filters.dueDateFrom || filters.dueDateTo || filters.overdue || filters.upcoming;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Due Date Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Due Date Filters</h3>
          </div>
          {hasActiveDateFilter && (
            <button
              onClick={clearDateFilters}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => handleFilterModeChange('all')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => handleFilterModeChange('specific')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filterMode === 'specific'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Specific Date
          </button>
          <button
            onClick={() => handleFilterModeChange('range')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filterMode === 'range'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Date Range
          </button>
          <button
            onClick={() => {
              handleFilterModeChange('overdue');
              handleOverdueChange(true);
            }}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filterMode === 'overdue'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Overdue
          </button>
          <button
            onClick={() => handleFilterModeChange('upcoming')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filterMode === 'upcoming'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Specific Date Filter */}
        {filterMode === 'specific' && (
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Select Date</label>
            <input
              type="date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-3 py-2 border text-gray-900 bg-white"
              value={filters.dueDate}
              onChange={(e) => handleSpecificDateChange(e.target.value)}
            />
          </div>
        )}

        {/* Date Range Filter */}
        {filterMode === 'range' && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-3 py-2 border text-gray-900 bg-white"
                value={filters.dueDateFrom}
                onChange={(e) => handleDateRangeChange(e.target.value, filters.dueDateTo)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-3 py-2 border text-gray-900 bg-white"
                value={filters.dueDateTo}
                onChange={(e) => handleDateRangeChange(filters.dueDateFrom, e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Upcoming Filter */}
        {filterMode === 'upcoming' && (
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">Due within (days)</label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm px-3 py-2 border text-gray-900 bg-white"
              value={filters.upcoming}
              onChange={(e) => handleUpcomingChange(e.target.value)}
            >
              <option value="">Select days</option>
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
