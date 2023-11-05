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
            where: {health: {eq: 0}}
            limit: 1
            orderBy: {startBlock: {desc: true}}
          ) {
            id
            name
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

        client.channels.fetch("1004698995765035021").then((channel) => {
          if (channel?.isTextBased()) {
            getPrediction(adventurer.name).then((prediction) => {
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
