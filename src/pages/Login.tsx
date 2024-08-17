import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', {
        code: new URLSearchParams(window.location.search).get('code')
      });

      const { isMember, userCoins, userInventory } = response.data;

      if (isMember) {
        // Store user data in local storage or state management (like Redux)
        localStorage.setItem('userCoins', userCoins);
        localStorage.setItem('userInventory', JSON.stringify(userInventory));

        navigate('/main');
      } else {
        alert("You must join the Discord server to play the game.");
      }
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  React.useEffect(() => {
    if (window.location.search.includes('code')) {
      handleLogin();
    }
  }, []);

  const initiateDiscordLogin = () => {
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=identify guilds`;
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-orange-400 to-yellow-500">
      <button
        onClick={initiateDiscordLogin}
        className="bg-white text-black font-bold py-2 px-4 rounded"
      >
        Join with Discord
      </button>
    </div>
  );
};

export default Login;
