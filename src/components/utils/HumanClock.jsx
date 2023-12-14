import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Chicago', // Nashville, TN timezone
  });

  return (
    <div className="text-blue-500 bg-gray-400 p-4 rounded-md">
      <h2 className="text-2xl font-bold mb-2">Current Time</h2>
      <div className="text-3xl">{formattedTime}</div>
    </div>
  );
};

export default Clock;
