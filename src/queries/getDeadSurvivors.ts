import { sdk, twitterClient } from "../config.js";
import { client } from "../index.js";
import { generateImage } from "../models/dalle/index.js";
import { getPrediction } from "../models/index.js";
import { getRandomStatement, summary } from "../models/statements/index.js";
import fs from "fs";
import fetch from "node-fetch";

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
                      downloadImage(image[0].url, adventurer.id + ".png").then(
                        () => {
                          channel.send({
                            embeds: [
                              {
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
                              },
                            ],
                          });

                          getPrediction(summary, prediction).then(
                            (summarised_story: string) => {
                              tweet(summarised_story, adventurer.id + ".png");
                            }
                          );
                        }
                      );
                      // send message
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

const tweet = async (text: any, imagePath: string) => {
  twitterClient.v1.uploadMedia(imagePath).then((mediaId) => {
    twitterClient.v2.tweet(text, {
      media: {
        media_ids: [mediaId],
      },
    });
  });

  // await twitterClient.v2.tweet(text);
  // await twitterClient.v1.uploadMedia(image);
};

const downloadImage = async (url: string, path: string) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(path, buffer);
};
