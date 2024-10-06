import React, { useState, useContext } from 'react';
import { SpendingContext } from '../context/SpendingContext';
import { Spending } from '../types'; // Adjust import as needed

interface AddSpendingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSpendingModal: React.FC<AddSpendingModalProps> = ({ isOpen, onClose }) => {
  const [userid, setUserId] = useState<number | ''>('');
  const [count, setCount] = useState<number | ''>('');
  const [type, setType] = useState<string>('');
  const [model, setModel] = useState<string>('');

  const [error, setError] = useState<string>(''); // State for error message
  const context = useContext(SpendingContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Input validation
    if (validateInputs()) {
      if (context) {
        const newSpending: Omit<Spending, 'id' | 'createdat'> = {
          userid: Number(userid), // Ensure userid is a number
          count: Number(count),   // Ensure count is a number
          type,
          model,
        };
        await context.addSpending(newSpending); // Call addSpending to post new data
        resetForm(); // Reset form fields
        onClose(); // Close modal after submission
      }
    }
  };

  const validateInputs = () => {
    if (userid === '' || count === '' || type.trim() === '' || model.trim() === '') {
      setError('All fields are required.');
      return false;
    }
    if (userid <= 0 || count <= 0) {
      setError('User ID and Count must be positive numbers.');
      return false;
    }
    setError(''); // Clear any existing errors
    return true; // All validations passed
  };

  const resetForm = () => {
    setUserId('');
    setCount('');
    setType('');
    setModel('');
    setError(''); // Clear error message on reset
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
          <h2 className="text-xl font-semibold mb-4">Add Spending</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="number"
                value={userid}
                onChange={(e) => setUserId(Number(e.target.value) || '')}
                placeholder="User ID"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value) || '')}
                placeholder="Count"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Type"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Spending
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
};

export default AddSpendingModal;
