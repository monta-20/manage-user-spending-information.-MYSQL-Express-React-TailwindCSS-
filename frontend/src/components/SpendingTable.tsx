// src/components/SpendingTable.tsx

import React from 'react';
import { Spending } from '../types'; // Importing the Spending type

interface SpendingTableProps {
  spendings: Spending[]; // Ensure this uses the Spending type
}

const SpendingTable: React.FC<SpendingTableProps> = ({ spendings }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">User ID</th>
          <th className="py-2 px-4 border-b">Count</th>
          <th className="py-2 px-4 border-b">Created At</th>
          <th className="py-2 px-4 border-b">Type</th>
          <th className="py-2 px-4 border-b">Model</th>
        </tr>
      </thead>
      <tbody>
        {spendings.map(spending => (
          <tr key={spending.id}>
            <td className="py-2 px-4 border-b">{spending.id}</td>
            <td className="py-2 px-4 border-b">{spending.userid}</td>
            <td className="py-2 px-4 border-b">{spending.count}</td>
            <td className="py-2 px-4 border-b">{spending.createdat}</td>
            <td className="py-2 px-4 border-b">{spending.type}</td>
            <td className="py-2 px-4 border-b">{spending.model}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpendingTable;
