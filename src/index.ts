import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

export const client = new SapphireClient({
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    loadMessageCommandListeners: true,
});

console.log("Logging in.....");

await client.login(process.env.DISCORD_TOKEN);

console.log("Logged in!");