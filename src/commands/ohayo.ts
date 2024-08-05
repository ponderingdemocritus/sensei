import { Command } from "@sapphire/framework";
import {
  generateImage,
  getText,
  katanaPrompt,
  ohioPrompt,
  prompt,
  ohayooo,
  haiku,
  nyc,
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
    if (
      query === "ohayo" ||
      query === "ohio" ||
      query === "katana" ||
      query === "ninja" ||
      query === "nyc"
    ) {
      let promptType;
      switch (query) {
        case "ohayo":
          promptType = prompt;
          break;
        case "ohio":
          promptType = ohioPrompt;
          break;
        case "katana":
          promptType = katanaPrompt;
          break;
        case "ninja":
          promptType = ohayooo;
          break;
        case "nyc":
          promptType = nyc;
          break;
      }

      const textPrompt = await getText(promptType);

      console.log(textPrompt);
      if (typeof textPrompt === "string") {
        await generateImage(textPrompt).then((image: any) => {
          console.log("image", image);
          downloadImage(image, "test.png").then(() => {
            return interaction.editReply({
              files: ["test.png"],
            });
          });
        });
      } else {
        return interaction.editReply({
          content: `Failed to generate image prompt for ${query}.`,
        });
      }
    } else {
      return interaction.editReply({
        content: await getText(haiku),
      });
    }
  }
}
