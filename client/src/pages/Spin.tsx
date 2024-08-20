import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Spin: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    const randomAngle = Math.floor(Math.random() * 360 + 360 * 12); // ensure at least one full rotation
    const score = 12000 - Math.floor((randomAngle % 360) / 30) * 1000;
    
    document.documentElement.style.setProperty('--spin-end-angle', `${randomAngle}deg`); 
    
    setTimeout(() => {
      setIsSpinning(false);
      alert('You won ' + score + ' coin!');
    }, 8000);
  };

  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Default';

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
      <div className="relative flex justify-center items-center" style={{ height: 'calc(100vh - 250px)' }} >
        <div className="wheel-pan w-full h-full">
          <img 
            src="/img/wheel-pan.png"
            alt={`wheel-pan`} 
            className={`h-full w-auto object-contain`} 
          />
        </div>
        <div className={`wheel`}>
          <div className="wheel-segments w-full h-full">
            <img
              src="/img/wheel.png"
              alt={`${displayType} wheel`}
              onClick={handleSpin}
              className={`h-full w-auto z-10 rounded-full object-contain ${isSpinning ? 'spinning' : ''}`}
            />
          </div>
        </div>
        <img src='/img/pin_red.png' className={`needle z-20`} />
      </div>

      {/* State Section */}
      <div className="flex justify-around items-center w-full max-w-md mx-auto">
        {/* Keys Section */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-bold">Keys</h2>
          <img src="/img/key.png" alt="Key" className="w-16 h-16 my-2" />
          <span className="text-xl">X10</span>
        </div>

        {/* Fragments Section */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-bold">Fragments</h2>
          <img src="/img/fragment.png" alt="Fragment" className="w-16 h-16 my-2" />
          <span className="text-xl">X2</span>
        </div>
      </div>
      
    </div>
  );
};

export default Spin;