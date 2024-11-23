import React from 'react';
import { useKanbanTasks } from '../hooks/useKanbanTasks';
import { KanbanBoard } from '../components/Kanban/KanbanBoard';
import { LoadingSpinner } from '../components/Kanban/LoadingSpinner';
import { KanbanForm } from '../components';

const Kanban: React.FC = () => {
  const { tasks, isLoading } = useKanbanTasks();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <KanbanForm />
      <KanbanBoard tasks={tasks} />
    </div>
  );
};

export default Kanban;