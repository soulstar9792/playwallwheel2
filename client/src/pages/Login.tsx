import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', {
        code: new URLSearchParams(window.location.search).get('code')
      });

      console.log('response.data', response.data);
      const { error, user,isMember, userCoins, userInventory } = response.data;
      if (error === "not_member") {
        toastr.warning("You must join the PlayWall Discord server to play the game.");
        return;
      }

      if (isMember) {
        toastr.success(`Welcome ${user.global_name}!`, "Success");
        // Store user data in local storage or state management (like Redux)
        localStorage.setItem('userCoins', userCoins);
        localStorage.setItem('userInventory', JSON.stringify(userInventory));

        navigate('/main');
      } else {
        toastr.warning("You must join the PlayWall Discord server to play the game.");
        return;
      }
    } catch (error) {
      console.error(error);
      toastr.error("Error occurred");
      return;
    }
  };

  React.useEffect(() => {
    // Check if the user is already logged in
    const userCoins = localStorage.getItem('userCoins');
    const userInventory = localStorage.getItem('userInventory');

    if (userCoins && userInventory) {
      // User is already logged in; navigate to the main page
      navigate('/main');
    } else if (window.location.search.includes('code')) {
      // If there's a code in the URL, try to log in
      handleLogin();
    }
  }, [navigate]);

  const initiateDiscordLogin = () => {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=1273980356634214501&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fplaywallwheel-d32590149af8.herokuapp.com%2F&integration_type=0&scope=identify+guilds+bot`;
  };

  // Check if user is logged in, no need to display the button or login the user if so.
  const userCoins = localStorage.getItem('userCoins');

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-orange-400 to-yellow-500">
      {!userCoins ? (
        <>
          <button
            onClick={initiateDiscordLogin}
            className="bg-white text-black font-bold py-2 px-4 rounded mb-4"
          >
            Join with Discord
          </button>
          <a
            href="https://discord.gg/zuFnrqRM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            Join PlayWall now!
          </a>
        </>
      ) : null}
    </div>
  );
};

export default Login;