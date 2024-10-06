// src/components/FilteringComponent.tsx

import React, { useState, useContext } from 'react';
import { SpendingContext } from '../context/SpendingContext';

const FilteringComponent: React.FC = () => {
  const context = useContext(SpendingContext);
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');

  const handleFilter = () => {
    const queryParams: string[] = [];

    if (userId) queryParams.push(`userid=${userId}`);
    if (startDate) queryParams.push(`startdate=${startDate}`);
    if (endDate) queryParams.push(`enddate=${endDate}`);
    if (type) queryParams.push(`type=${type}`);
    if (model) queryParams.push(`model=${model}`);

    if (context) {
      context.fetchData(queryParams.join('&')); // Fetch data with query parameters
    }
  };

  return (
    <div className="my-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Filter Spendings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="User ID" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input 
          type="date" 
          placeholder="Start Date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input 
          type="date" 
          placeholder="End Date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input 
          type="text" 
          placeholder="Type (Food, Entertainment...)" 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input 
          type="text" 
          placeholder="Model (Credit Card, Cash...)" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
      <button 
        onClick={handleFilter} 
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilteringComponent;
