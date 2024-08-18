import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inventory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-orange-400 to-yellow-500">
      <button onClick={() => navigate('/')} className="text-blue-500 mb-4">
        Back
      </button>
      <h1 className="text-3xl font-bold text-center">Your Inventory</h1>
      <div className="mt-8">
        {/* Display keys and fragments here */}
        <p>Common Keys: 5</p>
        <p>Uncommon Keys: 3</p>
        <p>Rare Keys: 1</p>
        <p>Legendary Keys: 0</p>
        <p>Mythic Keys: 0</p>
      </div>
    </div>
  );
};

export default Inventory;
