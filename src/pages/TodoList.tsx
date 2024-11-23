import { TaskInput, TaskList } from "../components";

const TodoList: React.FC = () => {
  return (
    <div className="min-h-screen items-center justify-center bg-gray-100 p-4 w-full">
      <div className="flex justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Todo List
          </h1>
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
