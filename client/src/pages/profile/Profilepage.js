import React, { useEffect, useState } from "react";
import { getUser, becomeMerchant } from "../../api/users";
import { saveToLocal } from "../../api/savetoLocal";
import { Link } from "react-router-dom";
import { getUserID, logout } from "../../api";
import { deleteMyRental, myRentals } from "../../api/rental";
import { toast } from "react-toastify";
import CountdownTimer from "./CountDown";
import { daysFromToday } from "../../constants/daysFromToday";

const userID = getUserID();

const Profilepage = ({ onUpdate, onDelete }) => {
  const [user, setUser] = useState({});
  const [rentals, setRenatls] = useState([]);
  const [expires, setExpires] = useState('');
  const [expId, setExpId] = useState('');

  // const [isEditing, setIsEditing] = useState(false);
  // const [editedUser, setEditedUser] = useState("");

  useEffect(() => {
    getUser();
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    setUser(userData);
  }, []);

  useEffect(() => {
    myRentals(setRenatls);
  }, []);


  function deleteExpiredItems(rental) {
    const currentTime = new Date().getTime();

    return rental.filter(item => {
        if (item.expire > currentTime) {
            return true; 
        } else {

            console.log(`Item with id ${item.id} has expired and is deleted.`);
            return false; 
        }
    });
  }

  function startExpirationCheck(interval) {
    setInterval(() => {
        setRenatls(deleteExpiredItems(rentals));
    }, interval);
  }

  startExpirationCheck(30000);



  console.log("merchant: ", user);
  console.log("our renatls", rentals);

  const makeMerchant = async () => {
    try {
      if (user) {
        const newData = { ...user, merchant: 1 };
        await becomeMerchant(newData);
        console.log("new data", newData);
        // saveToLocal("userData", newData);
        setUser(newData);
      }
    } catch (error) {
      console.error("Error making user a merchant:", error);
    }
  };

  const getFormattedDate = (dateTime)=>{
    console.log(dateTime);
    const dt = new Date(dateTime);
    return "Date: "+dt.getDate()+"/"+dt.getMonth()+"/"+dt.getFullYear()+" Time: "+dt.getHours()+":"+dt.getMinutes()
  }

  return (
    <>
    <div className="flex w-full my-4 mx-10 gap-9 justify-around">
      {/* side bar */}
      <div className="flex flex-col  border bg-slate-600 text-white px-2 py-1 md:w-[25%] m-3">
        <ul className="p-2 flex flex-col gap-3">
          <li>Home</li>

          {user?.merchant === 1 ? (
            <Link to={"/additem"}>
              <button className=" underline cursor-pointer">
                Rent your Product
              </button>
            </Link>
          ) : (
            <button className={"underline"} onClick={makeMerchant}>
              Become a Merchant
            </button>
          )}

          <li
            className=" underline text-red-500 cursor-pointer"
            onClick={logout}
          >
            log out
          </li>

          <li>delete your account</li>
        </ul>
      </div>

      {/* middle bar */}
      <div className="flex flex-col">
        <div>
          {user?.merchant ? (
            <div className="bg-green-300 rounded-sm p-2">
              "Your are Merchant!"
            </div>
          ) : (
            ""
          )}
        </div>

        {user && (
          <div className="flex flex-col my-5 mx-2">
            <div className="flex justify-center align-middle items-center  ">
              <img
                src={user.photo}
                className="rounded-full"
                alt={user.name}
                width={"200px"}
              />
            </div>

            <div className=" flex gap-2">
              <p className="text-xl font-bold ">User Name: </p>
              <p>{user.name}</p>
            </div>

            <div className=" flex gap-2">
              <p className="text-xl font-bold ">Email: </p>
              <p>{user.email}</p>
            </div>

            <div className="flex gap-2">
              <p className="text-xl font-bold ">Mobile no: </p>
              <p>{user.mobile}</p>
            </div>
          </div>
        )}
      </div>

    </div>
    
      <div className="flex flex-col  my-9  mx-16 px-12">
        <h1 className="text-2xl font-bold underline my-3">Your Rented list</h1>
        <div className="flex flex-col gap-2">
          <table>
            <thead>
              <tr>
                <th className="font-bold border bg-slate-700 text-white">Product image</th>
                <th className="font-bold border bg-slate-700 text-white">Product Name</th>
                <th className="font-bold border bg-slate-700 text-white">Returning date</th>
                <th className="font-bold border bg-slate-700 text-white">Paid</th>
              </tr>
            </thead>
         
            <tbody>
              {rentals?.map((r) => (
                <tr key={r.id}>
                  <td className="border flex justify-center items-end p-3">
                    <img src={r.item_img} alt={r.item_name} width={"150px"} />
                  </td>
                  <td className="border ">{r.item_name}</td>
                  <td className="border ">
                    {getFormattedDate(r.expire)}
                    <br />
                    <CountdownTimer dateTime={r.expire}/>

                  </td>
                  <td className="border ">{"₹ "+r.item_price* daysFromToday(r.expire)} </td>
                </tr>
              ))}
            </tbody>
            
            
          </table>

           { rentals.length === 0 &&
            <div className="flex flex-col justify-center items-center gap-2 border-slate-900 border w-full px-8 py-5">
                <p className="font-bold text-xl">Nothing Rented yet..</p>
                <button className="p-2 bg-slate-800 text-white font-bold rounded w-36">
                  <Link to={'/shop'}>Rent Now</Link>
                </button>
              </div>
            }
        </div>
      </div>
      </>
  );
};

export default Profilepage;
