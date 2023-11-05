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

export const deathStatement = `
    This is the object of an Adventurer who has just perished in a game called Loot Survivor, where players combat perilous beasts. Take the player's name and craft a one-sentence backstory, infusing it with dark humor in the manner of Gandalf. Roast them for their ill-fated decisions.

    \n {question}

    The first object represents the adventurer. Ensure that the statement includes a purpose and integrates these elements into its narrative. The next is the beast object, which has claimed the life of the player. Be sure to use the beast's name. If there's a special beast, its unique naming values should be combined accordingly, such as 'Death Tear' Balrog, for example.

    The final object is related to the discovery type. If this is a beast, omit any additional mention, as it would be repetitive with the beast object information. If the death was due to an Obstacle, include this context in the story. For instance, if 'Death Blades' are the cause, you might say the player was decapitated by them.

    Make the story max 4 sentences long.
    
  `;

export const bornStatement =
  "This is the an object of an Adventurer who just joined a game called Loot Surivor, where you fight crazy dangerous beasts, i want you to take the players name and create a 1 sentence backstory, use dark humour, speak like gandalf. Roast them for their bad decisions. \n {question}";

export const questionStatement =
  "You are gandalf, answer this question: \n {question}";

export const getPrediction = async (statement: string, text: string) => {
  const prompt = PromptTemplate.fromTemplate(statement);

  const chainA = new LLMChain({ llm: chatModel, prompt });

  const call = await chainA.call({ question: text });
  return call.text;
};
