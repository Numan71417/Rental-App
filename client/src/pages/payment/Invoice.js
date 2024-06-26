import React from "react";
import { Link, useParams } from "react-router-dom";
import { daysFromToday } from "../../constants/daysFromToday";
import  { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice = () => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const payInfo = JSON.parse(localStorage.getItem('paymentInfo')).data
  console.log(payInfo);

  const ref = useRef();

  const printDocument = () => {
    const input = ref.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape'); // Set orientation to landscape
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice-${userData.name}.pdf`);
      })
      .catch((err) => {
        console.error('Failed to generate PDF:', err);
      });
  };

  const getFormatDate = (date) => {
    
    const dt = new Date(date);
    const day = dt.getDate();
    const mon = dt.getMonth();
    const yr = dt.getFullYear();
    const hr = dt.getHours();
    const min = dt.getMinutes();

    return `${day}/${mon}/${yr} , ${hr}:${min}`
  }

  return (
    <div>
    <div id="divToPrint" ref={ref} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Invoice</h2>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-semibold">Payment Information</h3>
          <p><span className="font-semibold">Invoice ID:</span> {payInfo.id}</p>
          <p><span className="font-semibold">Branch:</span> {userData.location} </p>
          <p><span className="font-semibold">Payment Date-Time:</span> {getFormatDate(payInfo.payment_time)}</p>
        </div>
        <div className="text-right">
          <h3 className="text-xl font-semibold">User Information</h3>
          <p><span className="font-semibold">Name:</span> {payInfo.user_name}</p>
          <p><span className="font-semibold">Mobile:</span> {payInfo.user_mobile}</p>
          <p><span className="font-semibold">Address:</span> {payInfo.user_address}</p>
        </div>
      </div>
      <div className="border-t border-b py-4 mb-8">
        <h3 className="text-xl font-semibold mb-4">Item Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img src={payInfo.item_img} alt={payInfo.item_name} className="w-full h-64 object-contain rounded-lg mb-4" />
            <img src={payInfo.item_otherimg} alt={`${payInfo.item_name} other`} className="h-32 object-cover rounded-lg" />
          </div>
          <div>
            <p className="text-xl font-semibold mb-2">{payInfo.item_name}</p>
            <p className="text-gray-600 mb-4">{payInfo.item_desc}</p>
            <div className="mb-4">
              <span className="font-semibold">Category:</span> {payInfo.item_category}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Price:</span> ₹{payInfo.item_price}/day
            </div>
            {/* <div className="mb-4">
              <span className="font-semibold">Rented for (days): </span> {payInfo.item_days}
            </div> */}
            <div className="mb-4">
              <span className="font-semibold">Total Amount:</span> ₹{payInfo.amount}
            </div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <h3 className="text-xl font-semibold mb-2">Total</h3>
        <p className="text-2xl font-bold">₹{payInfo.amount}</p>
      </div>
    </div>
    <div className="flex justify-center my-6 gap-5">
      <button
        onClick={printDocument}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Download as PDF
      </button>

      <Link to={'/profile'}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Check Your Rentals
      </Link>
    </div>
  </div>
  )
}

export default Invoice
