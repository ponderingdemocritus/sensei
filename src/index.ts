import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import express from "express";
import http from "http";
import { setupWebSocketServer } from "./stream/index.js";
import cors from "cors";
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

const app = express();
app.use(cors());
const server = http.createServer(app);
const PORT = 3000;

setupWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
