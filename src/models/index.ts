import { ChatOpenAI } from "langchain/chat_models/openai";

export const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
  modelName: "gpt-4-turbo-2024-04-09",
});
