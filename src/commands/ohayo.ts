import { Command } from "@sapphire/framework";
import {
  generateImage,
  getText,
  katanaPrompt,
  ohioPrompt,
  prompt,
  ohayooo,
  haiku,
} from "../models/dalle/index.js";
import fs from "fs";
import fetch from "node-fetch";

const downloadImage = async (url: string, path: string) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  fs.writeFileSync(path, buffer);
};

export class Ohayo extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options, description: "Ask sensei" });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((builder) =>
          builder //
            .setName("question")
            .setDescription("Ask Sensei a Question")
            .setRequired(true)
        )
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const query = interaction.options.getString("question");

    await interaction.deferReply();

    console.log("response", query);
    if (query == "ohayo") {
      const textPrompt = await getText(prompt);

      console.log(textPrompt);
      if (typeof textPrompt === "string") {
        await generateImage(textPrompt).then((image: any) => {
          console.log("image", image);
          downloadImage(image, "test" + ".png").then(() => {
            return interaction.editReply({
              files: ["test" + ".png"],
            });
          });
        });
      } else {
        return interaction.editReply({
          content: "Failed to generate image prompt.",
        });
      }
    } else if (query === "ohio") {
      const ohioText = await getText(ohioPrompt);
      if (typeof ohioText === "string") {
        await generateImage(ohioText).then((image: any) => {
          downloadImage(image, "test.png").then(() => {
            return interaction.editReply({
              files: ["test.png"],
            });
          });
        });
      } else {
        return interaction.editReply({
          content: "Failed to generate image prompt for Ohio.",
        });
      }
    } else if (query === "katana") {
      const katanaText = await getText(katanaPrompt);
      if (typeof katanaText === "string") {
        await generateImage(katanaText).then((image: any) => {
          downloadImage(image, "test.png").then(() => {
            return interaction.editReply({
              files: ["test.png"],
            });
          });
        });
      } else {
        return interaction.editReply({
          content: "Failed to generate image prompt for Katana.",
        });
      }
    } else if (query === "ninja") {
      const ohayooText = await getText(ohayooo);
      if (typeof ohayooText === "string") {
        await generateImage(ohayooText).then((image: any) => {
          downloadImage(image, "test.png").then(() => {
            return interaction.editReply({
              files: ["test.png"],
            });
          });
        });
      } else {
        return interaction.editReply({
          content: "Failed to generate image prompt for Ohayoo.",
        });
      }
    } else {
      return interaction.editReply({
        content: await getText(haiku),
      });
    }
  }
}
