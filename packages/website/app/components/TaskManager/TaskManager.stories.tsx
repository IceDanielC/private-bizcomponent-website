import type { Meta, StoryObj } from '@storybook/react';
import TaskManager from './TaskManager';
import { useState } from 'react';

const TaskManagerWrapper: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <TaskManager
      tasks={tasks}
      newTask={newTask}
      onNewTaskChange={setNewTask}
      onAddTask={handleAddTask}
      onRemoveTask={handleRemoveTask}
    />
  );
};

const meta: Meta<typeof TaskManagerWrapper> = {
  title: 'TaskManager',
  component: TaskManagerWrapper
};

export default meta;
type Story = StoryObj<typeof TaskManagerWrapper>;

export const Default: Story = {
  args: {}
};
