import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { POLL_INTERVAL, pollGraphQL } from "./queries/index.js";
import { getDeadSurvivors } from "./queries/query.js";
import {
  deathStatement,
  getRandomStatement,
} from "./models/statements/index.js";

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

const deathPolling = () =>
  pollGraphQL({ llmStatement: getRandomStatement(), query: getDeadSurvivors });

// const lifePolling = () =>
//   pollGraphQL({ llmStatement: bornStatement, query: getBornSurvivors });

setInterval(deathPolling, POLL_INTERVAL);
// setInterval(lifePolling, POLL_INTERVAL);
