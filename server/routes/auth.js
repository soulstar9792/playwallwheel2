const express = require('express');
const DiscordOauth2 = require("discord-oauth2");

const router = express.Router();
const oauth = new DiscordOauth2();

router.post('/login', async (req, res) => {
  try {
    const code = req.body.code;
    // Validate 'code' is present
    if (!code) {
      return res.status(400).json({ error: "Authorization code not provided" });
    }

    const accessToken = await oauth.tokenRequest({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      code: code,
      scope: "identify guilds",
      grantType: "authorization_code",
      redirectUri: process.env.REDIRECT_URI,
    });

    // Ensure access token was retrieved successfully
    if (!accessToken || !accessToken.access_token) {
      return res.status(400).json({ error: "Failed to retrieve access token" });
    }

    const user = await oauth.getUser(accessToken.access_token);
    const guilds = await oauth.getUserGuilds(accessToken.access_token);

    const isMember = guilds.some(guild => guild.id === process.env.DISCORD_GUILD_ID);

    if (isMember) {
      // Mocked user coins and inventory info, replace with actual logic
      const userCoins = 1000; // Replace with actual logic to fetch user's coins
      const userInventory = {
        commonKeys: 5,
        uncommonKeys: 3,
        rareKeys: 1,
        legendaryKeys: 0,
        mythicKeys: 0,
      };

      return res.json({ user, userCoins, userInventory, isMember });
    } else {
      return res.json({ error: "not_member" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Authentication failed" });
  }
});

module.exports = router;
