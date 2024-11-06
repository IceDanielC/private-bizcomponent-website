interface TaskManagerProps {
  tasks: string[];
  newTask: string;
  onNewTaskChange: (value: string) => void;
  onAddTask: () => void;
  onRemoveTask: (index: number) => void;
}

export type { TaskManagerProps };
