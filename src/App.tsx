import "./assets/styles/index.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TodoList from "./pages/TodoList";
import Kanban from "./pages/Kanban";

const App: React.FC = () => {
  return (
    <div className="min-h-screen items-center justify-center bg-gray-100 p-4 w-full">
      <Router>
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
