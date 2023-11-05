import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { POLL_INTERVAL, pollGraphQL } from "./queries/index.js";

export const client = new SapphireClient({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  loadMessageCommandListeners: true,
});

console.log("Logging in.....");

await client.login(process.env.DISCORD_TOKEN);

console.log(`Polling GraphQL endpoint every ${POLL_INTERVAL} ms`);
setInterval(pollGraphQL, POLL_INTERVAL);
