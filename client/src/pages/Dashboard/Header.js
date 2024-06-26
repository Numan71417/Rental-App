import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between px-16">
      <div className="text-xl font-bold">Admin Dashboard</div>
      <Link to={'/additem'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Item
      </Link>
    </nav>
  );
};

export default Header;
