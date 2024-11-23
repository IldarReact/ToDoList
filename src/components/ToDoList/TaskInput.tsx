import React from 'react';
import useAddTask from '../../hooks/useAddTask';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';

const TaskInput: React.FC = () => {
  const { taskText, setTaskText, addTask } = useAddTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 mb-4 p-4 bg-gray-50 rounded-lg"
    >
      <TextInput
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter the task"
      />
      
      <Button type="submit">Add</Button>
    </form>
  );
};

export default TaskInput;
