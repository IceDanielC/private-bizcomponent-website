import React from 'react';
import { Input, Button, List, Checkbox } from '@private-basic-components';
import type { TaskManagerProps } from './interface';

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  newTask,
  onNewTaskChange,
  onAddTask,
  onRemoveTask
}) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">任务管理面板</h2>
      <div className="flex items-center mb-4">
        <Input
          value={newTask}
          onChange={(e) => onNewTaskChange(e.target.value)}
          placeholder="请输入任务进行搜索"
          className="flex-grow mr-2"
        />
        <Button onClick={onAddTask} className="bg-blue-500 text-white">
          新增任务
        </Button>
      </div>
      <List
        dataSource={tasks}
        renderItem={(task, index) => (
          <div className="flex items-center justify-between mb-2">
            <Checkbox className="mr-2" />
            <span className="flex-grow">{task}</span>
            <Button onClick={() => onRemoveTask(index)} className="text-red-500">
              删除
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export default TaskManager;
