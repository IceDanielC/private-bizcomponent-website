import type { Meta, StoryObj } from '@storybook/react';
import { TaskManager } from './index';
import type { TaskItem } from './interface';
const meta: Meta<typeof TaskManager> = {
  title: 'Business/TaskManager',
  component: TaskManager,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskManager>;

const mockTasks = [
  { id: '1', content: '任务一任务一任务一', completed: true },
  { id: '2', content: '任务二任务二任务二', completed: true },
  { id: '3', content: '任务三任务三任务三', completed: false },
  { id: '4', content: '任务四任务四任务四', completed: false },
];

export const Default: Story = {
  args: {
    tasks: mockTasks,
    onTaskAdd: (task: TaskItem) => console.log('添加任务:', task),
    onTaskDelete: (taskId: string) => console.log('删除任务:', taskId),
    onTaskStatusChange: (taskId: string, completed: boolean) => console.log('更改状态:', taskId, completed),
    onSearch: (keyword: string) => console.log('搜索:', keyword),
  },
}; 