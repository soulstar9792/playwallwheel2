import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Spin: React.FC = () => {
  const { type } = useParams<{ type?: string }>(); // Make type optional
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      alert('You won!');
    }, 5000);
  };

  const displayType = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Default'; // Fallback to 'Default'

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={() => navigate('/')} className="text-blue-500 mb-4">
        Back
      </button>
      <div className="text-center">
        <h1 className="text-3xl font-bold">{displayType} Wheel</h1>
        <div className="mt-8">
          <div className={`wheel ${isSpinning ? 'spinning' : ''}`} onClick={handleSpin}>
            <div className="wheel-segments">
              {/* You can add wheel segments here */}
            </div>
          </div>
        </div>
        <p className="mt-4">Key Count: 10 | Next Level Fragment: 2</p>
      </div>
    </div>
  );
};

export default Spin;