export type StatusType = 'todo' | 'inProgress' | 'done';
export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  order: number;
}