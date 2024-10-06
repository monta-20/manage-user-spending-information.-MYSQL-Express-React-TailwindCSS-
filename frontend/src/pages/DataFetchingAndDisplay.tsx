// src/pages/DataFetchingAndDisplay.tsx

import React, { useContext, useState } from 'react';
import { SpendingContext } from '../context/SpendingContext';
import SpendingTable from '../components/SpendingTable';
import FilteringComponent from '../components/SpendingFilter';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Spending } from '../types'; 
import AddSpendingModal from '../components/AddSpendingModal'; 

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const DataFetchingAndDisplay: React.FC = () => {
  const context = useContext(SpendingContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!context) {
    return <div className="text-center text-lg">Loading...</div>; // Show loading message until context is ready
  }

  const { spendings, fetchSpendings } = context;

  // Prepare data for charts
  const barChartData = {
    labels: spendings.map((spending: Spending) => spending.type),
    datasets: [{
      label: 'Total Spendings',
      data: spendings.map((spending: Spending) => spending.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const lineChartData = {
    labels: spendings.map((spending: Spending) => new Date(spending.createdat).toLocaleDateString()),
    datasets: [{
      label: 'Spendings Over Time',
      data: spendings.map((spending: Spending) => spending.count),
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 1)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      pointRadius: 5,
    }],
  };

  return (
    <div className="container mx-auto p-4">
      <FilteringComponent />

      <h2 className="text-2xl font-bold my-4">Spending Data</h2>

      <div className="flex justify-between mb-4">
        <button 
          onClick={fetchSpendings} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Fetch Spendings
        </button>

        <button 
          onClick={() => setIsModalOpen(true)} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Add New Spending
        </button>
      </div>

      <AddSpendingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <SpendingTable spendings={spendings} />

      <h3 className="text-xl my-4">Total Spendings by Type</h3>
      <div className="my-4">
        <Bar
          data={barChartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>

      <h3 className="text-xl my-4">Spendings Over Time</h3>
      <div className="my-4">
        <Line
          data={lineChartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DataFetchingAndDisplay;
