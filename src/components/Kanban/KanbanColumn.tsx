import React from "react";
import { KanbanTask } from "../../store/types/Task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import KanbanItem from "./KanbanItem";

interface KanbanColumnProps {
  statusType: KanbanTask["status"];
  columnTitle: string;
  tasks: KanbanTask[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ statusType, columnTitle, tasks }) => {
  const columnTasks = tasks
    .filter((task) => task.status === statusType)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex-1 mx-2">
      <Droppable droppableId={statusType}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-4 rounded-lg min-h-[400px] min-w-[300px] shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{columnTitle}</h2>
            {columnTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white  p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative"
                  >
                    <KanbanItem task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
