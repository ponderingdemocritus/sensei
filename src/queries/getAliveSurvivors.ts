import { GRAPHQL_ENDPOINT } from "./index.js";
import { client } from "../index.js";
import { ALIVE_ADVENTURERS } from "./query.js";

export const getAlive = async () => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ALIVE_ADVENTURERS),
    });

    if (!response.ok) {
      throw new Error(
        `Network error: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();

    console.log(result);

    const number = result.data?.adventurers?.length || 0;

    client.user?.setActivity(`${number} alive`, {
      state: `${number} alive`,
      type: 4,
    });

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      throw new Error("Failed to fetch GraphQL data.");
    }

    return result.data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};
