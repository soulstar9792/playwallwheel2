// client/src/pages/Inventory.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const inventory = useSelector((state: RootState) => state.user.inventory);

  // Retrieve the previous spin type (if available)
  const spinType = location.state?.type;

  // Define arrays of inventory items split into categories
  const coinsAndTokens = [
    { name: 'Community Coins', value: inventory.communityCoins, icon: '/img/playwall.png' },
    { name: 'Play Bucks Tokens', value: inventory.playBucksTokens, icon: '/img/playbucks.png' },
    { name: 'USDP Tokens', value: inventory.usdpTokens, icon: '/img/usdp.png' }
  ];

  const keys = [
    { name: 'Common Keys', value: inventory.commonKeys, icon: '/img/key_1.png' },
    { name: 'Uncommon Keys', value: inventory.uncommonKeys, icon: '/img/key_2.png' },
    { name: 'Rare Keys', value: inventory.rareKeys, icon: '/img/key_3.png' },
    { name: 'Legendary Keys', value: inventory.legendaryKeys, icon: '/img/key_4.png' },
    { name: 'Mythic Keys', value: inventory.mythicKeys, icon: '/img/key_5.png' }
  ];

  const fragments = [
    { name: 'Uncommon Key Fragments', value: inventory.uncommonKeyFragments, icon: '/img/frag_2.png' },
    { name: 'Rare Key Fragments', value: inventory.rareKeyFragments, icon: '/img/frag_3.png' },
    { name: 'Legendary Key Fragments', value: inventory.legendaryKeyFragments, icon: '/img/frag_4.png' },
    { name: 'Mythic Key Fragments', value: inventory.mythicKeyFragments, icon: '/img/frag_5.png' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-orange-400 to-yellow-500">
      <div className="flex justify-between items-center">
        <button onClick={() => navigate('/')} className="text-blue-500 m-10">
          Back
        </button>
        
      {/* Add Back to Spin Button if spinType is available */}
      {spinType && (
        <button
          onClick={() => navigate(`/spin/${spinType}`)} 
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Back to Spin...
        </button>
      )}
      </div>


      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Your Inventory</h1>
      </div>
      {/* Create a grid for the columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* First Column: Coins and Tokens */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Coins and Tokens</h2>
          {coinsAndTokens.map((item) => (
            <div key={item.name} className="inventory-item border-2 border-solid	border-pink-200	shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.icon} alt={item.name} className="w-12 h-12 mr-4" />
                <span className="text-lg font-semibold">{item.name}</span>
              </div>
              <span className="text-xl font-bold">{item.value || 0}</span>
            </div>
          ))}
        </div>

        {/* Second Column: Keys */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Keys</h2>
          {keys.map((item) => (
            <div key={item.name} className="inventory-item border-2 border-solid	border-pink-200	shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.icon} alt={item.name} className="w-12 h-12 mr-4" />
                <span className="text-lg font-semibold">{item.name}</span>
              </div>
              <span className="text-xl font-bold">{item.value || 0}</span>
            </div>
          ))}
        </div>

        {/* Third Column: Fragments */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Fragments</h2>
          {fragments.map((item) => (
            <div key={item.name} className="inventory-item border-2 border-solid	border-pink-200	shadow-lg rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <img src={item.icon} alt={item.name} className="w-12 h-12 mr-4" />
                <span className="text-lg font-semibold">{item.name}</span>
              </div>
              <span className="text-xl font-bold">{item.value || 0}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;