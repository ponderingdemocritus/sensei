import { GRAPHQL_ENDPOINT } from "./index.js";
import { client } from "../index.js";
import { ALIVE_ADVENTURERS, TOP_ADVENTURERS } from "./query.js";

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

export const getGraphql = async ({ query }: { query: string }) => {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error(
        `Network error: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();

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

const topAdventurers = new Set();

export const getTopAdventurers = () => {
  fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(TOP_ADVENTURERS),
  })
    .then((response) => response.json())
    .then((data) => {
      const fetchedAdventurers = data.data.adventurers;

      // Sort fetched adventurers by xp in descending order
      fetchedAdventurers.sort((a: any, b: any) => b.xp - a.xp);

      fetchedAdventurers.forEach((adventurer: any) => {
        if (!topAdventurers.has(adventurer.id)) {
          // If the set has less than 3 adventurers, add the new one
          if (topAdventurers.size < 3) {
            topAdventurers.add(adventurer.id);
          } else {
            // Find and remove the adventurer with the lowest score
            let lowestScoreAdventurer = null;
            let lowestScore = Infinity;
            topAdventurers.forEach((id: any) => {
              if (id.xp < lowestScore) {
                lowestScore = id.xp;
                lowestScoreAdventurer = id;
              }
            });

            if (lowestScoreAdventurer && adventurer.xp > lowestScore) {
              topAdventurers.delete(lowestScoreAdventurer);
              topAdventurers.add(adventurer.id);
            }
          }

          // Log new adventurer
          console.log("New top adventurer:", adventurer.name);

          client.channels
            .fetch(process.env.DISCORD_SURVIVOR_CHANNEL || "")
            .then((channel) => {
              if (channel?.isTextBased()) {
                const exampleEmbed = {
                  color: 0x00ff3c,
                  title:
                    "TOP SCORE: " +
                    adventurer.name +
                    " " +
                    adventurer.xp +
                    "xp",
                  url: "https://survivor.realms.world/",
                  timestamp: new Date().toISOString(),
                  footer: {
                    text: "New 1337 Survivor",
                  },
                };

                channel.send({ embeds: [exampleEmbed] });
              }
            });
        }
      });

      if (fetchedAdventurers.length === 0) {
        console.log("No new adventurers found at this time.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle error here
    });
};
