// server/bot.js
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const User = require('./models/User');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config();

const client = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.AutoModerationConfiguration,
            GatewayIntentBits.AutoModerationExecution,
            GatewayIntentBits.GuildMessagePolls,
            GatewayIntentBits.DirectMessagePolls,
        ]
});

client.commands = new Collection();

const commands = []; // Array to hold commands for registration

// Command handling
const commandFiles = fs.readdirSync('./server/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON()); // Add command data for registration
}

// Command Registration
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID), // Use guild command registration
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async interaction => {
    console.log("interactionCreate");
    if (interaction.isCommand()) {
        console.log("interaction is command.", interaction.commandName);

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    if (interaction.isButton()) { // Ensure the interaction is a button interaction
        if (interaction.customId === 'claimGift') {
            const userId = interaction.user.id;

            // Optionally, you can have the amount of coins here, for example, 100
            const coinsToAdd = 100;

            // Find or create the user in the database
            let userRecord = await User.findOne({ userId: userId, guildId: interaction.guild.id });
            if (!userRecord) {
                userRecord = new User({ userId: userId, guildId: interaction.guild.id, coins: 0 });
            }

            // Add coins to the user's balance
            userRecord.coins += coinsToAdd;
            await userRecord.save();

            // Disable the button after claiming the gift
            const disabledRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('claimedGift') // You could have a different custom ID if needed
                        .setLabel('You have claimed your gift! 🎉')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(true) // Disable the button
                );

            // Acknowledge the button click and update the message with disabled button
            await interaction.update({ content: `${interaction.user.displayName} has claimed a gift of ${coinsToAdd} coins!`, components: [disabledRow] });
        }
    }
});

// Event handling
const eventFiles = fs.readdirSync('./server/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log the bot in
client.login(process.env.DISCORD_BOT_TOKEN); // Add your bot token in .env file