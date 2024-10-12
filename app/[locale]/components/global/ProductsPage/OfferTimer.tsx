import { useEffect, useState } from 'react';

function OfferTimer({targetDate}:any) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const countdownTime = new Date(targetDate).getTime();
      const distance = countdownTime - now;

      if (distance < 0) {
        clearInterval(intervalId);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

//   return timeLeft;
return (
    <div className="">
          <div className="my-3 mx-auto w-fit flex items-center gap-1 ">
                  <span className="border-2 border-gray-300 p-1 rounded-lg text-center">{timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}</span> : 
                  <span className="border-2 border-gray-300 p-1 rounded-lg text-center">{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span> : 
                  <span className="border-2 border-gray-300 p-1 rounded-lg text-center">{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span> : 
                  <span className="border-2 border-gray-300 p-1 rounded-lg text-center"> {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                </div>
    </div>
)
}

export default OfferTimer;