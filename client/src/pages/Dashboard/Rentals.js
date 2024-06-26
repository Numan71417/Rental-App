import React from 'react';
import { getFormatDate } from '../payment/Payment';

const Rentals = ({ rentals }) => {



  console.log(rentals);
  return (
    <div className="overflow-x-auto my-6 ">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/7 px-2 py-2">Rental id</th>
            <th className="w-1/7 px-2 py-2">Item id</th>
            <th className="w-1/7 px-2 py-2">Item Name</th>
            <th className="w-1/7 px-2 py-2">Renter Name</th>
            <th className="w-1/7 px-2 py-2">price</th>
            <th className="w-1/7 px-2 py-2">Return Date</th>
            <th className="w-1/7 px-2 py-2">Photo</th>
          </tr>
        </thead>
        <tbody>
          {rentals && rentals.map((rental) => (
            <tr>
              <td className="border px-4 py-2 text-center">{rental.id}</td>
              <td className="border px-4 py-2 text-center">{rental.item_id}</td>
              <td className="border px-4 py-2 text-center">{rental.item_name}</td>
              <td className="border px-4 py-2 text-center">{rental.renter_name}</td>
              <td className="border px-4 py-2 text-center">{rental.price}</td>
              <td className="border px-4 py-2 text-center">{getFormatDate(rental.expire)}</td>
              <td className="border px-4 py-2 flex rentals-center justify-center">
                <img src={rental.item_img} alt='img' width={'46px'} />
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rentals;
