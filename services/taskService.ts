import api from './api';
import { Task } from '../redux/slices/taskSlice';

export const taskService = {
    getTasks: async (params?: {
        status?: string;
        search?: string;
        priority?: string;
        dueDate?: string;
        dueDateFrom?: string;
        dueDateTo?: string;
        overdue?: string;
        upcoming?: string;
    }) => {
        const response = await api.get('/tasks', { params });
        const rawTasks = Array.isArray(response.data) ? response.data : (response.data.tasks || []);
        try {
            return rawTasks.map((t: any) => ({
                id: t._id || t.id,
                title: t.litle || t.title || 'Untitled',
                description: t.description || '',
                status: t.status || 'todo',
                priority: t.priority || 'medium',
                dueDate: t.dueDate,
                createdAt: t.createdAt || new Date().toISOString()
            }));
        } catch (error) {
            console.error('Error mapping tasks:', error);
            return [];
        }
    },

    getTask: async (id: string) => {
        const response = await api.get(`/tasks/${id}`);
        const t = response.data;
        return {
            id: t._id || t.id,
            title: t.litle || t.title || 'Untitled',
            description: t.description || '',
            status: t.status || 'todo',
            priority: t.priority || 'medium',
            dueDate: t.dueDate,
            createdAt: t.createdAt || new Date().toISOString()
        };
    },

    createTask: async (taskData: Partial<Task>) => {
        const response = await api.post('/tasks', taskData);
        const t = response.data.task || response.data;
        return {
            id: t._id || t.id,
            title: t.litle || t.title || 'Untitled',
            description: t.description || '',
            status: t.status || 'todo',
            priority: t.priority || 'medium',
            dueDate: t.dueDate,
            createdAt: t.createdAt || new Date().toISOString()
        };
    },

    updateTask: async (id: string, taskData: Partial<Task>) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        const t = response.data.task || response.data;
        return {
            id: t._id || t.id,
            title: t.litle || t.title || 'Untitled',
            description: t.description || '',
            status: t.status || 'todo',
            priority: t.priority || 'medium',
            dueDate: t.dueDate,
            createdAt: t.createdAt || new Date().toISOString()
        };
    },

    deleteTask: async (id: string) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },
};
