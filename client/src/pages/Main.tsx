import React from 'react';
import { useNavigate } from 'react-router-dom';

const wheels = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Mythic'];

const Main: React.FC = () => {
  const navigate = useNavigate();
  const userCoins = localStorage.getItem('userCoins');
  const userInventory = JSON.parse(localStorage.getItem('userInventory') || '{}');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between">
        <div>
          <p>Coins: {userCoins}</p>
          {/* Add more user info if necessary */}
        </div>
        <button
          onClick={() => navigate('/inventory')}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Inventory
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {wheels.map((wheel) => (
          <div
            key={wheel}
            className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer"
            onClick={() => navigate(`/spin/${wheel.toLowerCase()}`)}
          >
            <h2 className="text-2xl font-bold">{wheel} Wheel</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
