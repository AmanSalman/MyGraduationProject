import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Sales',
    },
  },
  scales: {
    x: {
      type: 'category', // Use 'category' for string-based x-axis labels
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    y: {
      min: 0,
    },
  },
};

function MyChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Book Sales',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL2}/order/sales-data`);
        const salesData = response.data;

        const updatedChartData = {
          ...chartData,
          labels: salesData.map(monthData => monthData._id), // Assuming _id corresponds to the month index (1 for Jan, 2 for Feb, etc.)
          datasets: [
            {
              ...chartData.datasets[0],
              data: salesData.map(monthData => monthData.totalSales),
            },
          ],
        };

        setChartData(updatedChartData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    }

    fetchSalesData();
  }, []); 

  return <Line options={options} data={chartData} />;
}

export default MyChart;
