// client/src/pages/Login.tsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { setUserData } from '../slices/userSlice'; // Import the action
import 'toastr/build/toastr.min.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Create dispatch instance

  const userState = useSelector((state: any) => state.user); // Select user state

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', {
        code: new URLSearchParams(window.location.search).get('code')
      });

      console.log('response.data', response.data);
      const { error, user, isMember } = response.data;

      if (error === "not_member") {
        toastr.warning("You must join the PlayWall Discord server to play the game.");
        return;
      }

      if (isMember) {
        toastr.success(`Welcome ${user.global_name}!`, "Success");

        // Dispatch the full user data to the Redux store
        dispatch(setUserData({
          userId: user.userId,
          guildId: user.guildId,
          coins: user.userCoins,
          xp: user.xp,
          level: user.level,
          messageCount: user.messageCount,
          lastDaily: user.lastDaily,
          lastWeekly: user.lastWeekly,
          inventory: user.userInventory,
          roles: user.roles,
          keyUsageHistory: user.keyUsageHistory,
          currencyTransactions: user.currencyTransactions,
          isMember,
        }));

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
    // Check if the user is already logged in by inspecting Redux store
    if (userState.userId) {
      navigate('/main');
    } else if (window.location.search.includes('code')) {
      // If there's a code in the URL, try to log in
      handleLogin();
    }
  }, [navigate, userState.userId]);

  const initiateDiscordLogin = () => {
    window.location.href = `https://discord.com/oauth2/authorize?client_id=1273980356634214501&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fplaywallwheel-d32590149af8.herokuapp.com%2F&integration_type=0&scope=identify+guilds+bot`;
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-orange-400 to-yellow-500">
      {!userState.userId ? (
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