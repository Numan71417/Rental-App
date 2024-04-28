import React from "react";

const Orders = ({ order }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto mb-8">
      <img className="w-full h-56 object-cover object-center" src={order.product.photo} alt={order.product.name} />
      <div className="p-4">
        <h2 className="text-gray-800 text-2xl font-semibold">{order.product.name}</h2>
        <p className="text-gray-600">${order.product.price}</p>
        <p className="text-gray-600">Rental Time: {order.rentalTime}</p>
        <p className="text-gray-600">End Date: {order.endDate}</p>
      </div>
    </div>
  );
};

export default Orders;
