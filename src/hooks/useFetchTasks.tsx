import { useEffect, useState } from 'react';
import { useAppDispatch } from './redux';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { setTasks } from '../store/slices/taskSlice';
import { Task } from '../store/types/Task';

const useFetchTasks = () => {
  const dispatch = useAppDispatch();
  const [tasks, setLocalTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('order', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks: Task[] = [];
      const seenIds = new Set();

      snapshot.forEach((doc) => {
        const id = doc.id;
        if (!seenIds.has(id)) {
          seenIds.add(id);
          const data = doc.data();
          tasks.push({
            id,
            text: data.text,
            completed: data.completed,
            order: data.order
          });
        }
      });

      const sortedTasks = tasks.sort((a, b) => a.order - b.order);
      setLocalTasks(sortedTasks);
      dispatch(setTasks(sortedTasks));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return tasks;
};

export default useFetchTasks;