import { sdk } from "../config.js";
import { client } from "../index.js";
import { generateImage } from "../models/dalle/index.js";
import { getPrediction } from "../models/index.js";
import { getRandomStatement } from "../models/statements/index.js";

const seenAdventurers = new Set();

export const getDeadSurvivors = async () => {
  await sdk
    .getDeadSurvivors()
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
              // get last actions
              getLastActionBeforeDeath(adventurer.id).then((death) => {
                // get prediction
                getPrediction(getRandomStatement(), JSON.stringify(death)).then(
                  (prediction) => {
                    // generate image
                    generateImage(prediction).then((image: any) => {
                      const exampleEmbed = {
                        color: 0x00ff3c,
                        title:
                          adventurer.name +
                          (adventurer.health === 0
                            ? " has died"
                            : " has entered the arena"),
                        url: "https://survivor.realms.world/",
                        description: prediction,
                        timestamp: new Date().toISOString(),
                        image: {
                          url: image[0].url,
                        },
                        footer: {
                          text: "dedicated to the fallen",
                        },
                      };

                      // send message
                      channel.send({ embeds: [exampleEmbed] });
                    });
                  }
                );
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

export const getLastActionBeforeDeath = async (id: number) => {
  try {
    const { data } = await sdk.getLastActionsBeforeDeath({ id });

    return data;
  } catch (error) {
    console.error("Fetching error:", error);
    throw error;
  }
};
