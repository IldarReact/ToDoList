import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Task } from '../store/types/Task';

const useUpdateTaskOrder = () => {
  const updateTaskOrderInFirebase = async (task: Task) => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        order: task.order
      });
    } catch (error) {
      console.error('Error updating task order:', error);
      throw error;
    }
  };

  return { updateTaskOrderInFirebase };
};

export default useUpdateTaskOrder;