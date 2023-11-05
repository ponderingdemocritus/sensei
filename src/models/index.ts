import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

export const llm = new OpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
});

export const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPEN_AI_API_KEY,
});

const prompt = PromptTemplate.fromTemplate(
  "This is the name of an Adventurer who is about to travel into the game called Loot Surivor, where you fight crazy dangerous beasts, i want you to take the players name and create a 1 sentence backstory, use dark humour, speak like gandalf. Start with capitals saying that they have entered the game, and question their resolve. \n {question}"
);

const chainA = new LLMChain({ llm: chatModel, prompt });

export const getPrediction = async (text: string) => {
  const call = await chainA.call({ question: text });
  return call.text;
};
