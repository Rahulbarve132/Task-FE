import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'done';
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt: string;
}

interface TaskState {
    tasks: Task[];
    selectedTask: Task | null;
    filters: {
        status: string;
        search: string;
        priority: string;
        dueDate: string;
        dueDateFrom: string;
        dueDateTo: string;
        overdue: string;
        upcoming: string;
    };
    uiState: {
        isCreateModalOpen: boolean;
        isEditModalOpen: boolean;
        isLoading: boolean;
        error: string | null;
    };
}

const initialState: TaskState = {
    tasks: [],
    selectedTask: null,
    filters: {
        status: '',
        search: '',
        priority: '',
        dueDate: '',
        dueDateFrom: '',
        dueDateTo: '',
        overdue: '',
        upcoming: '',
    },
    uiState: {
        isCreateModalOpen: false,
        isEditModalOpen: false,
        isLoading: false,
        error: null,
    },
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            state.uiState.isLoading = false;
            state.uiState.error = null;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex((t) => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        },
        setSelectedTask: (state, action: PayloadAction<Task | null>) => {
            state.selectedTask = action.payload;
        },
        setFilters: (state, action: PayloadAction<Partial<TaskState['filters']>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        toggleCreateModal: (state, action: PayloadAction<boolean>) => {
            state.uiState.isCreateModalOpen = action.payload;
        },
        toggleEditModal: (state, action: PayloadAction<boolean>) => {
            state.uiState.isEditModalOpen = action.payload;
        },
        setTaskLoading: (state, action: PayloadAction<boolean>) => {
            state.uiState.isLoading = action.payload;
        },
        setTaskError: (state, action: PayloadAction<string | null>) => {
            state.uiState.error = action.payload;
            state.uiState.isLoading = false;
        },
    },
});

export const {
    setTasks,
    addTask,
    updateTask,
    removeTask,
    setSelectedTask,
    setFilters,
    toggleCreateModal,
    toggleEditModal,
    setTaskLoading,
    setTaskError,
} = taskSlice.actions;

export default taskSlice.reducer;
