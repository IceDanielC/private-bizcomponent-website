export interface TaskItem {
  id: string;
  content: string;
  completed: boolean;
}

export interface TaskManagerProps {
  tasks?: TaskItem[];
  onTaskAdd?: (task: TaskItem) => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, completed: boolean) => void;
  onSearch?: (keyword: string) => void;
}
