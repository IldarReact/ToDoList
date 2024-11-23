import React from 'react';
import { DragDropContext } from "@hello-pangea/dnd";
import { useKanbanDrag } from '../../hooks/useKanbanDrag';
import KanbanColumn from './KanbanColumn';
import { StatusType, KanbanTask } from '../../store/types/kanban';

interface KanbanBoardProps {
  tasks: KanbanTask[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const { handleDragEnd } = useKanbanDrag(tasks);
  const columns: StatusType[] = ['todo', 'inProgress', 'done'];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-6 justify-around">
        {columns.map((status) => (
          <KanbanColumn
            key={status}
            statusType={status}
            columnTitle={status.charAt(0).toUpperCase() + status.slice(1)}
            tasks={tasks}
          />
        ))}
      </div>
    </DragDropContext>
  );
};