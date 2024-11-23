import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import kanbanTaskReducer from './slices/kanbanTaskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    kanbanTasks: kanbanTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
