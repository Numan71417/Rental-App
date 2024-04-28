import React, { useState } from "react";

const Profilepage = ({  onUpdate, onDelete }) => {
  const user = {name : null,
  image : null,
email : null ,
id : null,
};
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(user.id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSaveClick = () => {
    onUpdate(editedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto mb-8">
        <img className="w-full h-56 object-cover object-center" src={user.photo} alt={user.name} />
        <div className="p-4">
          <h2 className="text-gray-800 text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      {!isEditing && (
        <div className="flex">
          <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
          <button onClick={handleDeleteClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
            Delete
          </button>
        </div>
      )}
      {isEditing && (
        <div className="mt-8">
          <input type="text" name="name" value={editedUser.name} onChange={handleChange} className="border rounded px-2 py-1 mb-4" />
          <input type="email" name="email" value={editedUser.email} onChange={handleChange} className="border rounded px-2 py-1 mb-4" />
          <input type="text" name="photo" value={editedUser.photo} onChange={handleChange} className="border rounded px-2 py-1 mb-4" />
          <div>
            <button onClick={handleSaveClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
            <button onClick={handleCancelClick} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profilepage;
