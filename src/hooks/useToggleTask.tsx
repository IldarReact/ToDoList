import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Task } from '../store/types/Task';

const useToggleTask = () => {
  const toggleTask = async (task: Task) => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, { completed: !task.completed });
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  return { toggleTask };
};

export default useToggleTask;
