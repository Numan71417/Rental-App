import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/orebiSlice";
import { getUserID } from "../../api";
import { rentProduct } from "../../api/rental";
import { daysFromToday } from "../../constants/daysFromToday";

const userId = getUserID();

const ItemCard = ({ item, returnDate, setReturnDate }) => {
  const dispatch = useDispatch();
  // const [finalPrice, setFinalPrice] = useState("")

  const handleRentProduct = async()=>{
    if(!returnDate){
      alert("Enter date of return");
      return;
    }
    console.log(returnDate);
    const rentalData = {
      seller:item.ownerId,
      renter:userId,
      expire:returnDate,
      item_id:item._id
    }
    dispatch(deleteItem(item._id))
    console.log("rental data: ",rentalData);
    if(await rentProduct(rentalData)){
      window.location.href = '/profile'
    }

  }
  const getFormatDate = (date)=>{
    if(daysFromToday(date) === -1){
      alert("Enter valid date")
      setReturnDate("");
      return
    }
    const dt  = new Date(date);
    const day = dt.getDate();
    const mon = dt.getMonth();
    const yr = dt.getFullYear();
    const hr = dt.getHours();
    const min = dt.getMinutes();

    return  `${day}/${mon}/${yr} , ${hr}:${min}`
  }

  return (
    <div className="w-full mb-4 border py-2 flex justify-between gap-20 ">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4 w-full justify-between">
        <ImCross
          onClick={() => dispatch(deleteItem(item._id))}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />

        <div className="w-1/5 flex flex-col justify-center items-center gap-2">
          <img className="w-32 h-32" src={ item.image} alt="productImage" />
          <h1 className="font-titleFont font-semibold">{item.name}</h1>
        </div>

        <div className="flex w-1/5 items-center text-md font-semibold">
          No of days: <br />
         {returnDate?
          <p className=" font-normal p-2">
            {"" + daysFromToday(returnDate) }
            </p>
          :
          <p className="font-normal p-2">Select date</p>
          }
        </div>

        <div className="flex w-1/5 items-center text-lg font-semibold">
         {returnDate ? "₹"+ item.price * daysFromToday(returnDate) : "₹"+item.price}
        </div>
      </div>

      <div className=" w-full col-span-5 mdl:col-span-3 flex items-center justify-around py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">

        <div className="w-1/5 flex items-center gap-6 text-lg">
             <input
                className=""
                type="datetime-local" // Date and time input
                name="dateTime"
                id="dateTime"
                placeholder="Choose Return Date and time"
                value={returnDate}
                required
                onChange={(e)=>setReturnDate(e.target.value)}
            />

            <label htmlFor="dateTime" className=" text-sm w-36">
             {returnDate &&  <p>{getFormatDate(returnDate)}</p> }
            </label>

        </div>


        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          {/* <p>₹{item.quantity * item.price}</p> */}
          <button className="text-sm cursor-pointer mx-10 p-2 bg-slate-800 text-white rounded" onClick={handleRentProduct}>Rent Now</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
