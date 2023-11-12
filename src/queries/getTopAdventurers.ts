import { sdk } from "../config.js";
import { client } from "../index.js";

const topAdventurers = new Set();

export const getTopAdventurers = async () => {
  await sdk
    .getTopAdventurers()
    .then(({ data: data }) => {
      const fetchedAdventurers = data.adventurers;

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
            .fetch(process.env.DISCORD_SURVIVOR_HIGH_SCORE || "")
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
