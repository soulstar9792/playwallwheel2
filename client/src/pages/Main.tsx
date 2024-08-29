import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types'; // Adjust the import path accordingly
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const coins = useSelector((state: RootState) => state.user.inventory.communityCoins);
  const isMember = useSelector((state: RootState) => state.user.id ? true : false);

  // Sample wheels data
  const wheels = [
    { name: 'Common', image: '/img/wheel.png' },
    { name: 'Uncommon', image: '/img/wheel.png' },
    { name: 'Rare', image: '/img/wheel.png' },
    { name: 'Legendary', image: '/img/wheel.png' },
    { name: 'Mythic', image: '/img/wheel.png' },
  ];

  // Handle redirection if not a member
  React.useEffect(() => {
    if (!isMember) {
      toastr.warning("You must join the PlayWall Discord server to play the game.");
      navigate('/');
    }
  }, [isMember, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-orange-400 to-yellow-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-lg font-bold">Coins: {coins}</p>
        </div>
        <button
          onClick={() => navigate('/inventory')}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Inventory
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {wheels.map((wheel) => (
          <div
            key={wheel.name}
            className="flex items-center bg-transparent border-2 border-orange-700 shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/spin/${wheel.name.toLowerCase()}`)}
          >
            <img 
              src={wheel.image} 
              alt={`${wheel.name} Wheel`} 
              className="h-24 w-24 object-cover rounded-full mr-4" 
            />
            <h2 className="text-2xl font-bold">{wheel.name} Wheel</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;