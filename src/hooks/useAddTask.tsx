import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setError } from '../store/slices/taskSlice';
import { db } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Task } from '../store/types/Task';
import { RootState } from '../store/store';

const useAddTask = () => {
  const [taskText, setTaskText] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const addNewTask = async () => {
    if (!taskText.trim()) return;

    try {
      const newTask: Omit<Task, 'id'> = {
        text: taskText,
        completed: false,
        order: tasks.length,
      };

      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      dispatch(addTask({ ...newTask, id: docRef.id }));
      setTaskText('');
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to add task'));
    }
  };

  return { taskText, setTaskText, addTask: addNewTask };
};


export default useAddTask;