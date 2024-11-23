import { useDispatch } from 'react-redux';
import { DropResult } from "@hello-pangea/dnd";
import { setTasks as setTasksAction, setError } from '../store/slices/kanbanTaskSlice';
import { updateTaskStatusInFirebase, updateTaskOrderInFirebase } from '../services/firebase';
import { StatusType, KanbanTask } from '../store/types/kanban';

export const useKanbanDrag = (tasks: KanbanTask[]) => {
  const dispatch = useDispatch();

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const taskToUpdate = tasks.find((task: KanbanTask) => task.id === draggableId);
    if (!taskToUpdate) return;

    try {
      const updatedTasks = [...tasks];
      const newStatus = destination.droppableId as StatusType;
      
      const [removed] = updatedTasks.splice(
        updatedTasks.findIndex((t: KanbanTask) => t.id === draggableId),
        1
      );

      const updatedTask = {
        ...removed,
        status: newStatus,
      };

      updatedTasks.splice(
        destination.index,
        0,
        updatedTask
      );

      const finalTasks = updatedTasks.map((task: KanbanTask, index) => ({
        ...task,
        order: task.status === newStatus ? index : task.order
      }));

      dispatch(setTasksAction(finalTasks));

      if (taskToUpdate.status !== newStatus) {
        await updateTaskStatusInFirebase(draggableId, newStatus);
      }
      await updateTaskOrderInFirebase(finalTasks);

    } catch (error) {
      dispatch(setError("Failed to update task order"));
      console.error("Error updating task order:", error);
    }
  };

  return { handleDragEnd };
};
