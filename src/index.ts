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
const port = process.env.PORT || 3000;

setupWebSocketServer(server);

server.listen(port, () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
