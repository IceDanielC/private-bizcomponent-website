import React, { useState } from 'react';
import { Input, Button, Checkbox } from '@private-basic-components';
import type { TaskManagerProps, TaskItem } from './interface';

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks = [],
  onTaskAdd,
  onTaskDelete,
  onTaskStatusChange,
  onSearch,
}) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      onTaskAdd?.({
        id: Date.now().toString(),
        content: newTask,
        completed: false,
      });
      setNewTask('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="p-4 w-full max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">任务管理面板</h1>
      
      {/* 搜索区域 */}
      <div className="mb-4">
        <Input
          placeholder="请输入任务进行搜索"
          onChange={(e) => onSearch?.(e.target.value)}
          allowClear
          suffix={<span className="text-gray-400">🔍</span>}
        />
      </div>

      {/* 新增任务区域 */}
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="请输入新增的任务信息"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onPressEnter={handleKeyPress}
        />
        <Button onClick={handleAddTask}>新增任务</Button>
      </div>

      {/* 任务列表 */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={task.completed}
                onChange={(e) => onTaskStatusChange?.(task.id, e.target.checked)}
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>
                {task.content}
              </span>
            </div>
            <Button
              onClick={() => onTaskDelete?.(task.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              删除
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager; 