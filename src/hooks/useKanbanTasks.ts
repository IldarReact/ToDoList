import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setTasks as setTasksAction, setError } from '../store/slices/kanbanTaskSlice';
import { getTasks as getTasksFromFirebase } from '../services/firebase';

export const useKanbanTasks = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.kanbanTasks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getTasksFromFirebase();
        dispatch(setTasksAction(fetchedTasks));
      } catch (error) {
        dispatch(setError("Failed to load tasks"));
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, [dispatch]);

  return { tasks, isLoading };
};