import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/Task';
import { TaskState, } from '../types/Task';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      // Проверяем на дубликаты перед установкой
      const uniqueTasks = action.payload.filter((task, index, self) =>
        index === self.findIndex((t) => t.id === task.id)
      );
      state.tasks = uniqueTasks;
      state.loading = false;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTaskOrder: (state, action: PayloadAction<Task[]>) => {
      // Проверяем на дубликаты перед обновлением
      const uniqueTasks = action.payload.filter((task, index, self) =>
        index === self.findIndex((t) => t.id === task.id)
      );
      state.tasks = uniqueTasks;
    },
    toggleTaskComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  setLoading,
  setError,
  updateTaskOrder,
  toggleTaskComplete,
} = taskSlice.actions;

export default taskSlice.reducer;