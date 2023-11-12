import { sdk } from "../config.js";
import { client } from "../index.js";

export const getAlive = async () => {
  try {
    const { data } = await sdk.getTopAdventurers();

    console.log(data);

    const number = data.adventurers?.length || 0;

    client.user?.setActivity(`${number} alive`, {
      state: `${number} Alive`,
      type: 4,
    });

    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};
