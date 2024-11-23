import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanTask, KanbanState, } from '../types/Task';

const initialState: KanbanState = {
  tasks: [],
  loading: false,
  error: null,
};

const kanbanTaskSlice = createSlice({
  name: 'kanbanTasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<KanbanTask[]>) => {
      state.tasks = action.payload;
    },
    addKanbanTask: (state, action: PayloadAction<KanbanTask>) => {
      state.tasks.push(action.payload);
    },
    setTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; status: KanbanTask['status'] }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTasks, addKanbanTask, setTaskStatus, removeTask, setLoading, setError } = kanbanTaskSlice.actions;
export default kanbanTaskSlice.reducer;