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
  "I want you to act like Gandalf from Lord of the rings. I want you to respond and answer like Gandalf using the tone, manner and vocabulary Gandalf would use. Do not write any explanations. Only answer like Gandalf. You must know all of the knowledge of Gandalf. \n {question}"
);

const chainA = new LLMChain({ llm: chatModel, prompt });

export const getPrediction = async (text: string) => {
  const call = await chainA.call({ question: text });
  return call.text
}