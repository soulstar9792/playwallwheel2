// client/src/pages/Spin.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import { useSelector } from 'react-redux'; // Import useSelector
import toastr from 'toastr'; // Import toastr for notifications
import 'toastr/build/toastr.min.css';

const Spin: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();

  // Fetch user data from the Redux store
  const user = useSelector((state: any) => state.user); // Select user state

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);

    try {
      const userId = user.id; // Use the user ID from the Redux store
      const response = await axios.post('/api/spin', { type, userId });
      const message = response.data.message;
      const angle = response.data.angle;

      document.documentElement.style.setProperty('--spin-end-angle', `${angle}deg`);


      setTimeout(() => {
        setIsSpinning(false);
        // Show success message with toastr
        toastr.success(message, "Spin Result");
      }, 8000);
    } catch (error) {
      console.error('Error during spin:', error);
      toastr.error("Error occurred during the spin"); // Error message
    }
  };

  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Default';

  // Determine which counts to show based on the spin type
  let keysCount = 0;
  let fragmentsCount = 0;

  switch (type) {
    case 'common':
      keysCount = user.inventory.commonKeys;
      fragmentsCount = user.inventory.uncommonKeyFragments;
      break;
    case 'uncommon':
      keysCount = user.inventory.uncommonKeys;
      fragmentsCount = user.inventory.rareKeyFragments;
      break;
    case 'rare':
      keysCount = user.inventory.rareKeys;
      fragmentsCount = user.inventory.legendaryKeyFragments;
      break;
    case 'legendary':
      keysCount = user.inventory.legendaryKeys;
      fragmentsCount = user.inventory.mythicKeyFragments;
      break;
    case 'mythic':
      keysCount = user.inventory.mythicKeys;
      fragmentsCount = 0; // No fragments for mythic
      break;
    default:
      break;
  }

  return (
    <div className="min-h-screen bg-gray-100 bg-gradient-to-b from-orange-400 to-yellow-500 flex flex-col items-center">
      <div className="w-full flex justify-start">
        <button onClick={() => navigate('/')} className="text-blue-500 m-10">
          Back
        </button>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">{displayType} Wheel</h1>
      </div>
      <div className="relative flex justify-center items-center" style={{ height: 'calc(100vh - 250px)' }}>
        <div className="wheel-pan w-full h-full">
          {/* <img 
            src="/img/wheel-pan.png"
            alt={`wheel-pan`} 
            className={`h-full w-auto object-contain`} 
          /> */}
        </div>
        <div className={`wheel`}>
          <div className="wheel-segments w-full h-full">
            <img
              src={`/img/wheel_${type}.png`}
              alt={`${displayType} wheel`}
              onClick={handleSpin}
              className={`h-full w-auto z-10 rounded-full object-contain ${isSpinning ? 'spinning' : ''}`}
            />
          </div>
        </div>
        <img src='/img/pin_red.png' 
            alt={`wheel-needle`} className={`needle z-20`} />
      </div>

      {/* State Section */}
      <div className="flex justify-around items-center w-full max-w-md mx-auto">
        {/* Keys Section */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-bold">Keys</h2>
          <img src="/img/key.png" alt="Key" className="w-16 h-16 my-2" />
          <span className="text-xl">{keysCount}</span>
        </div>

        {/* Fragments Section */}
        {fragmentsCount > 0 && (
          <div className="flex flex-col items-center text-center">
            <h2 className="font-bold">Fragments</h2>
            <img src="/img/fragment.png" alt="Fragment" className="w-16 h-16 my-2" />
            <span className="text-xl">{fragmentsCount}</span>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Spin;