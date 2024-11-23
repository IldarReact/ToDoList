import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addKanbanTask } from "../../services/firebase";
import { addKanbanTask as addKanbanTaskAction } from "../../store/slices/kanbanTaskSlice";

export const KanbanForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const newTask = await addKanbanTask({
        title,
        description,
        status: "todo",
        order: 0,
      });

      dispatch(addKanbanTaskAction(newTask));
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-4 min-h-[400px] max-w-[400px]">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSubmitting}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[160px]"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default KanbanForm;
