import React from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { daysFromToday } from "../../constants/daysFromToday";
import PayMethod from "./PayMethod";

export const getFormatDate = (date) => {
    
  const dt = new Date(date);
  const day = dt.getDate();
  const mon = dt.getMonth();
  const yr = dt.getFullYear();
  const hr = dt.getHours();
  const min = dt.getMinutes();

  return `${day}/${mon}/${yr} , ${hr}:${min}`
}


const Payment = () => {
  const { id } = useParams();
  const paymentData = JSON.parse(localStorage.getItem('rented'))
  const userData = JSON.parse(localStorage.getItem('userData'))
  const { item, rentalData } = paymentData;
  const payInfo = JSON.parse(localStorage.getItem('paymentInfo')).data
  console.log(payInfo);


  
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10 flex gap-5   ">
        <div className="w-full flex flex-col justify-center">

          <div className="flex">
            <h1 className="text-lg font-bold">Product Name: </h1>
            <h1 className="text-lg font-semibold">{item.name}</h1>
          </div>

          <div className="flex">
            <img src={item.image} width={'150px'} alt="" />
          </div>

          <div className="flex">
            <h1 className="text-lg font-bold">Category: </h1>
            <h1 className="text-lg font-semibold">{item.category}</h1>
          </div>
          <div className="flex">
            <h1 className="text-lg font-bold">Quantity: </h1>
            <h1 className="text-lg font-semibold">{item.quantity}</h1>
          </div>
          <div className="flex">
            <h1 className="text-lg font-bold">Return Date: </h1>
            <h1 className="text-lg font-semibold">{getFormatDate(rentalData.expire)}</h1>
          </div>


          <Link to="/shop">
            <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
              Explore More
            </button>
          </Link>
        </div>
        <PayMethod />
      </div>

      {/* payment details  */}
     
   


    </div>
  );
};

export default Payment;
