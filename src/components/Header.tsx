import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-center items-center space-x-10">
        <Link to="/">
          <p className="text-xl font-bold">Todo List</p>
        </Link>
        <Link to="/kanban">
          <p className="text-xl font-bold">Kanban</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
