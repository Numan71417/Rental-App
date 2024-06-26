import React, { useEffect, useState } from 'react';
import UserTable from './UserTable';
import ItemTable from './ItemTable';
import Header from './Header';
import { getAllItems } from '../../api/items';
import { getAllUsers } from '../../api/users';
import { getAllRentals } from '../../api/rental';
import Rentals from './Rentals';

const Dashboard = () => {
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])
  const [rentals, setRentals] = useState([])

  useEffect(()=>{
    getAllItems(setItems);
    getAllUsers(setUsers);
    getAllRentals(setRentals);
  },[])

  console.log(items, users, rentals);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <UserTable users={users} />
        <h2 className="text-2xl font-bold mt-8 mb-4">Items</h2>
        <ItemTable items={items} />
        <h2 className="text-2xl font-bold mt-8 mb-4">Rentals</h2>
        <Rentals rentals={rentals} />
      </div>
    </div>
  );
};

export default Dashboard;

