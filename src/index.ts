import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import { POLL_INTERVAL, pollGraphQL } from "./queries/index.js";
import { bornStatement, deathStatement } from "./models/index.js";
import { getBornSurvivors, getDeadSurvivors } from "./queries/query.js";

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
  pollGraphQL({ llmStatement: deathStatement, query: getDeadSurvivors });

const lifePolling = () =>
  pollGraphQL({ llmStatement: bornStatement, query: getBornSurvivors });

setInterval(deathPolling, POLL_INTERVAL);
setInterval(lifePolling, POLL_INTERVAL);
