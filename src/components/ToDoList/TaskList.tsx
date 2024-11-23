import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateTaskOrder } from "../../store/slices/taskSlice";
import TaskItem from "./TaskItem";
import { useFetchTasks, useUpdateTaskOrder, useToggleTask } from "../../hooks";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useFetchTasks();
  const { updateTaskOrderInFirebase } = useUpdateTaskOrder();
  const { toggleTask } = useToggleTask();
  const loading = useAppSelector((state) => state.tasks.loading);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    const updatedTasks = reorderedTasks.map((task, index) => ({
      ...task,
      order: index,
    }));

    dispatch(updateTaskOrder(updatedTasks));

    try {
      await Promise.all(updatedTasks.map(task => updateTaskOrderInFirebase(task)));
    } catch (error) {
      console.error("Failed to update task orders:", error);
      dispatch(updateTaskOrder(tasks));
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!tasks) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <Draggable 
                key={task.id} 
                draggableId={task.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskItem
                      task={task}
                      onToggleComplete={() => toggleTask(task)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;