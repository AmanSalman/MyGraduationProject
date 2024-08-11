import React from 'react';
import './statsCard.css'
const StatsCard = ({ title, number, change,color }) => {
  return (
    <div className="stats-card">
          <div>
      <h3 className="stats-card__title">{title}</h3>
      <p className="stats-card__number">{number}</p>
          </div>
        <div>
        <span className='card-icon' style={{fontSize:'2.5rem', color:`${color}`}}>{change}</span>
        </div>
    </div>
  );
};

export default StatsCard;
