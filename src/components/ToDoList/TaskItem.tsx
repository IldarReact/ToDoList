import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Task } from "../../store/types/Task";
import Button from "../ui/Button";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import useDeleteTask from "../../hooks/useDeleteTask";

interface TaskItemProps {
  task: Task;
  onToggleComplete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteTask } = useDeleteTask();

  const handleDelete = async () => {
    if (!task.id) return;

    setIsLoading(true);
    try {
      await deleteTask(task.id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      alert("Не удалось удалить задачу");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!task.id || isLoading || !editText.trim()) return;

    setIsLoading(true);
    try {
      const taskRef = doc(db, "tasks", task.id);
      await setDoc(taskRef, {
        text: editText.trim(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setIsEditing(false);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
      alert("Не удалось сохранить изменения");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 m-2 rounded-lg shadow-md">
      {isEditing ? (
        <div className="flex items-center w-full">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow mr-4 p-2 border rounded"
            autoFocus
          />
          <div className="flex space-x-2">
            <Button 
              onClick={handleSave}
              disabled={isLoading || !editText.trim()}
            >
              {isLoading ? "..." : "✅"}
            </Button>
            <Button 
              onClick={() => {
                setEditText(task.text);
                setIsEditing(false);
              }}
              disabled={isLoading}
            >
              ❌
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={onToggleComplete}
              className="h-5 w-5 text-green-500 border-gray-300 rounded"
            />
            <span className={`flex-grow ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
              {task.text}
            </span>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => setIsEditing(true)}>✏️</Button>
            <Button onClick={() => setIsModalOpen(true)}>🗑️</Button>
          </div>
        </>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TaskItem;