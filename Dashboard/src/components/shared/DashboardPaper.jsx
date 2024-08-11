import React from 'react';
import './Paper.css';

const DashboardPaper = ({ children }) => {
  return (
    <div className="dashboard-paper">
      {children}
    </div>
  );
};

export default DashboardPaper;
