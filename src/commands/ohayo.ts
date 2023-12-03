import { Command } from "@sapphire/framework";
// import { getPrediction } from "../models/index.js";
// import { questionStatement } from "../models/statements/index.js";
import { questionChain } from "../models/loaders/utils.js";

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

    const response = await questionChain.call({ query });

    console.log("response", response);

    return interaction.editReply({
      content: response.text,
    });
  }
}
