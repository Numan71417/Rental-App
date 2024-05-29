import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CiBank } from "react-icons/ci";
import { FaRegCreditCard } from "react-icons/fa";
import { GrPaypal } from "react-icons/gr";

const PayMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setPaymentDetails({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 5000);

    if(isSuccess){
        setTimeout(()=>{
            window.location.href = '/profile'
        },3000)
    }
  };

  return (
    <div className="max-w-md md:max-w-full w-4/5 flex-wrap items-center justify-center   mx-auto p-6 bg-white shadow-lg rounded-lg flex gap-10">
      
      <div className="flex flex-col space-y-2 mb-4">

      <h2 className="text-2xl font-bold mb-4 mt-3">Select Payment Method</h2>

        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => handleMethodChange('internet_banking')}
        >
          Internet Banking
           {/* <span> <CiBank />  </span> */}
        </button>
        <button
          className="p-2 bg-green-500 text-white rounded"
          onClick={() => handleMethodChange('debit_credit_card')}
        >
          Debit/Credit Card 
          {/* <span><FaRegCreditCard /></span> */}
        </button>
        <button
          className="p-2 bg-yellow-500 text-white rounded"
          onClick={() => handleMethodChange('upi')}
        >
          UPI Payment <span> <img src="https://cdn.iconscout.com/icon/free/png-256/free-upi-2085056-1747946.png?f=webp" width={'70px'} alt="" /> </span>
        </button>
        <button
          className="p-2 bg-indigo-500 text-white rounded"
          onClick={() => handleMethodChange('paypal')}
        >
          PayPal
          {/* <span><GrPaypal /></span> */}
        </button>
      </div>
     
      <div>
      {selectedMethod && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Enter {selectedMethod.replace('_', ' ')} Details</h3>
          <div className="flex flex-col space-y-2">
            {selectedMethod === 'internet_banking' && (
              <>
                <input
                  type="text"
                  name="bank_name"
                  placeholder="Bank Name"
                  className="p-2 border rounded"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="account_number"
                  placeholder="Account Number"
                  className="p-2 border rounded"
                  onChange={handleInputChange}
                />
              </>
            )}
            {selectedMethod === 'debit_credit_card' && (
              <>
                <input
                  type="text"
                  name="card_number"
                  placeholder="Card Number"
                  className="p-2 border rounded"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="expiry_date"
                  placeholder="Expiry Date"
                  className="p-2 border rounded"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  className="p-2 border rounded"
                  onChange={handleInputChange}
                />
              </>
            )}
            {selectedMethod === 'upi' && (
              <input
                type="text"
                name="upi_id"
                placeholder="UPI ID"
                className="p-2 border rounded"
                onChange={handleInputChange}
              />
            )}
            {selectedMethod === 'paypal' && (
              <input
                type="email"
                name="paypal_email"
                placeholder="PayPal Email"
                className="p-2 border rounded"
                onChange={handleInputChange}
              />
            )}
          </div>
          <button
            className="mt-4 p-2 bg-purple-500 text-white rounded"
            onClick={handlePaymentSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Submit Payment'}
          </button>
        </div>
      )}


      {isSuccess && (
        <div className="text-center text-green-500 font-bold mt-4">
          Payment Successful!
          <p className='text-slate-700 text-sm font-semibold'>You are redirected to profile page...</p>
        </div>
      )}
      </div>


    </div>
  );
};

export default PayMethod;
