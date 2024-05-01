import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CountdownTimer = ({ dateTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date(dateTime);
    
    const countdown = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(countdown);
        toast.error("Please return your product, your time expired");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`Time left: ${days} days, ${hours}:${minutes}:${seconds}`);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(countdown);
  }, [dateTime]);

  return (
    <div>
      <p className='text-red-400 font-bold'>{timeLeft}</p>
    </div>
  );
};

export default CountdownTimer;
