import React from 'react';

const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto my-5">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/8 px-2 py-2">User Id</th>
            <th className="w-1/6 px-2 py-2">Name</th>
            <th className="w-1/6 px-2 py-2">Email</th>
            <th className="w-1/6 px-2 py-2">Mobile</th>
            <th className="w-1/6 px-2 py-2">Address</th>
            <th className="w-1/6 px-2 py-2">Photo</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr>
              <td className="border px-4 py-2 text-center">{user.id}</td>
              <td className="border px-4 py-2 text-center">{user.name}</td>
              <td className="border px-4 py-2 text-center">{user.email}</td>
              <td className="border px-4 py-2 text-center">{user.mobile}</td>
              <td className="border px-4 py-2 text-center">{user.location}{" , "} {user.address} </td>
              <td className="border px-4 py-2 flex items-center justify-center">
                <img src={user.photo} alt='img' width={'46px'} />
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
