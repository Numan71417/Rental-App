import React, { useEffect, useState } from "react";
import { getUser, becomeMerchant } from "../../api/users";
import { saveToLocal } from "../../api/savetoLocal";


const Profilepage = ({  onUpdate, onDelete }) => {
  const [user, setUser] = useState({})

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState('');


useEffect(() => {
  getUser()
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
      setUser(userData);
  }
}, []);

  console.log(user.merchant);
  

  const makeMerchant = async () => {
    try {
        if (user) {
            const newData = { ...user, merchant: 1 };
            await becomeMerchant(newData);
            saveToLocal('userData', newData)
            setUser(newData); 
        }
    } catch (error) {
        console.error('Error making user a merchant:', error);
    }
};

  return (
   <div className="flex">
      {/* side bar */}
      <div className="flex flex-col border bg-slate-600">
        <ul>
          <li>Home</li>
          {
            user.merchant ?
            <li>Rent your Product</li>
            :
            <button className={'p-2 bg-slate-800 rounded-md text-blue-400'} onClick={makeMerchant}>Become a Merchant</button>
          }
          <li>log out</li>
          <li>delete your account</li>
        </ul>
      </div>
   </div>
  );
};

export default Profilepage;
