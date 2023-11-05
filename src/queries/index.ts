import { client } from "../index.js";
import { getPrediction } from "../models/index.js";

export const GRAPHQL_ENDPOINT =
  "https://survivor-mainnet-indexer.realms.world/graphql";
export const POLL_INTERVAL = 3000; // Poll every 5000 ms (5 seconds)

const seenAdventurers = new Set();

const graphqlQuery = {
  query: `
    query{
      adventurers(
        limit: 1
        where: {health: {eq: 0}}
        orderBy: {timestamp: {desc: false}}
      ) {
        id
        name
        xp
        gold
        health
      }
    }
  `,
};

export const pollGraphQL = () => {
  fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  })
    .then((response) => response.json())
    .then((data) => {
      const newAdventurers = data.data.adventurers.filter(
        (adventurer: any) => !seenAdventurers.has(adventurer.id)
      );

      // Process new adventurers here
      newAdventurers.forEach((adventurer: any) => {
        console.log("New adventurer:", adventurer);

        client.channels
          .fetch(process.env.DISCORD_SURVIVOR_CHANNEL || "")
          .then((channel) => {
            if (channel?.isTextBased()) {
              getPrediction(JSON.stringify(adventurer)).then((prediction) => {
                channel.send(prediction);
              });
            }
          });

        seenAdventurers.add(adventurer.id);
      });

      if (newAdventurers.length === 0) {
        console.log("No new adventurers found at this time.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle error here
    });
};
