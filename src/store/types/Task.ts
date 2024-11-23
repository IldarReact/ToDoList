export interface Task {
    id: string;
    text: string;
    completed: boolean;
    order: number;
}

export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export interface KanbanTask {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'inProgress' | 'done';
    order: number;
}

export interface KanbanTaskState {
    tasks: KanbanTask[];
    loading: false,
    error: null,
}

export interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export interface KanbanState {
    tasks: KanbanTask[];
    loading: boolean;
    error: string | null;
}