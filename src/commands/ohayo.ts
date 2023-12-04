import { Command } from "@sapphire/framework";
import { ragChain } from "../models/loaders/utils.js";

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

    const response = await ragChain.invoke(query);

    const target = await interaction.guild?.channels.cache.get("id");

    console.log("response", response);

    if (target?.isTextBased()) {
      // Check if response length is greater than 2000 characters
      if (response.length > 2000) {
        // Split the response into two parts
        const part1 = response.substring(0, 2000);
        const part2 = response.substring(2000);

        // Send the first part
        await target.send("**" + query + "**: " + part1);

        // Send the second part
        await target.send(part2);
      } else {
        // Send response as is if it's less than 2000 characters
        await target.send("**" + query + "**: " + response);
      }
    }
  }
}
