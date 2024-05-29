import React from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import PaymentComponent from "./PayCompo";

const Payment = () => {
  const {id} = useParams();
  const paymentData = JSON.parse(localStorage.getItem('rented'))
  const {item, rentalData} = paymentData;

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <div className="pb-10">
        <div className="w-full flex flex-col justify-center">
          <div className="flex">
            <h1 className="text-lg font-bold">Product Name: </h1>
            <h1 className="text-lg font-semibold">{item.item_name}</h1>

          </div>
        </div>
        <PaymentComponent/>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 hover:bg-black duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
