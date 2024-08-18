  import React, { useState } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';

  const Spin: React.FC = () => {
    const { type } = useParams<{ type?: string }>();
    const [isSpinning, setIsSpinning] = useState(false);
    const navigate = useNavigate();

    const handleSpin = () => {
      if (isSpinning) return;
      setIsSpinning(true);
      
      const randomAngle = Math.floor(Math.random() * 360 + 360 * 4); // ensure at least one full rotation
      const score = Math.floor((randomAngle % 360) / 30) * 1000 + 1000;
      
      // Set CSS variable on the needle style using randomAngle instead of needleAngle
      document.documentElement.style.setProperty('--spin-end-angle', `${randomAngle}deg`); 
    
      setTimeout(() => {
        setIsSpinning(false);
        alert('You won ' + score + ' coin!');
      }, 8000);
    };

    const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Default';

    return (
      <div className="min-h-screen bg-gray-100 p-6 bg-gradient-to-b from-orange-400 to-yellow-500 flex flex-col items-center">
        <div className="w-full flex justify-start mb-4">
          <button onClick={() => navigate('/')} className="text-blue-500">
            Back
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">{displayType} Wheel</h1>
        </div>
        <div className="relative mt-8 flex justify-center items-center">
          <div className={`wheel`} onClick={handleSpin}>
            <div className="wheel-segments">
              <img
                src="/img/wheel.png"
                alt={`${displayType} wheel`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div
            className={`needle ${isSpinning ? 'spinning' : ''}`}
          />
        </div>
        <p className="mt-4 text-center max-w-md mx-auto">Key Count: 10 | Next Level Fragment: 2</p>
      </div>
    );
  };

  export default Spin;