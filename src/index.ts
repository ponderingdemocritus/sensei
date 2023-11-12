import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import {
  getDeadSurvivors,
  getTopAdventurers,
  getAlive,
} from "./queries/index.js";
import { POLL_INTERVAL } from "./config.js";

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

setInterval(getDeadSurvivors, POLL_INTERVAL);

setInterval(getAlive, POLL_INTERVAL * 3);

setInterval(getTopAdventurers, POLL_INTERVAL * 3);
