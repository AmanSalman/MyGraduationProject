import React from 'react';

const OrderDateTime = ({ createdAt }) => {
  const dateTime = new Date(createdAt);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <div>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
    </div>
  );
};

export default OrderDateTime;
