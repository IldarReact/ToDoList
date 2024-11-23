import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const useDeleteTask = () => {
  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      return true;
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      throw error;
    }
  };

  return { deleteTask };
};

export default useDeleteTask;
