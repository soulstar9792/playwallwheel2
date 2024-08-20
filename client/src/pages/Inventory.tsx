import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';  // Adjust the import path according to your file structure

const Inventory: React.FC = () => {
  const navigate = useNavigate();
  
  // Use the RootState type to type the state
  const inventory = useSelector((state: RootState) => state.user.inventory);

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-orange-400 to-yellow-500">
      <button onClick={() => navigate('/')} className="text-blue-500 mb-4">
        Back
      </button>
      <h1 className="text-3xl font-bold text-center">Your Inventory</h1>
      <div className="mt-8">
        <p>Common Keys: {inventory.commonKeys || 0}</p>
        <p>Uncommon Keys: {inventory.uncommonKeys || 0}</p>
        <p>Rare Keys: {inventory.rareKeys || 0}</p>
        <p>Legendary Keys: {inventory.legendaryKeys || 0}</p>
        <p>Mythic Keys: {inventory.mythicKeys || 0}</p>
      </div>
    </div>
  );
};

export default Inventory;