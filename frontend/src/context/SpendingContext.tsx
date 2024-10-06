// src/context/SpendingContext.tsx

import React, { createContext, useState, ReactNode } from 'react';
import { Spending } from '../types'; // Import the Spending type
import axios from 'axios';

interface SpendingContextType {
  spendings: Spending[];
  fetchSpendings: () => Promise<void>;
  fetchData: (queryParams: string) => Promise<void>;
  addSpending: (newSpending: Omit<Spending, 'id' | 'createdat'>) => Promise<void>;
  
}

export const SpendingContext = createContext<SpendingContextType | undefined>(undefined);

export const SpendingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spendings, setSpendings] = useState<Spending[]>([]);

  // Fetch all spendings initially
  const fetchSpendings = async () => {
    try {
      const response = await axios.get('http://localhost:4000/spendings'); // Use axios
      setSpendings(response.data.data); // Assuming response.data.data is an array of spendings
    } catch (error) {
      console.error('Failed to fetch spendings:', error);
    }
  };

  // Fetch data based on query parameters
  const fetchData = async (queryParams: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/spendings?${queryParams}`);
      setSpendings(response.data.data); // Update state with filtered spendings
    } catch (error) {
      console.error('Failed to fetch filtered spendings:', error);
    }
  };

  // Add new spending
  const addSpending = async (newSpending: Omit<Spending, 'id' | 'createdat'>) => {
    try {
      const response = await axios.post('http://localhost:4000/spendings', newSpending);
      if (!response.data.error) {
        // Assuming the server responds with the new spending including id and createdat
        setSpendings((prev) => [...prev, { ...newSpending, id: response.data.id, createdat: response.data.createdat }]);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to add spending:', error);
    }
  };

  

  return (
    <SpendingContext.Provider value={{ spendings, fetchSpendings, fetchData, addSpending }}>
      {children}
    </SpendingContext.Provider>
  );
};
