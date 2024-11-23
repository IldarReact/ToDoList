import React from "react";
import { KanbanTask } from "../../store/types/Task";
import { useDispatch } from "react-redux";
import { setError, removeTask as removeTaskAction } from "../../store/slices/kanbanTaskSlice";
import { deleteTask as deleteTaskFromFirebase } from "../../services/firebase";

interface KanbanItemProps {
  task: KanbanTask;
}

const KanbanItem: React.FC<KanbanItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskFromFirebase(taskId);
      dispatch(removeTaskAction(taskId));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError("Failed to delete task"));
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="bg-white p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative">
      <h3 className="font-medium text-gray-800 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <button
        onClick={() => handleDeleteTask(task.id)}
        className="absolute bottom-2 right-2 bg-red-500 text-white px-3 py-1 rounded-[10px] hover:bg-red-600 transition-all duration-300 ease-in-out"
      >
        Delete
      </button>
    </div>
  );
};

export default KanbanItem;
