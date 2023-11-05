import { Command } from "@sapphire/framework";
import { getPrediction, questionStatement } from "../models/index.js";

export class Question extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, { ...options, description: "Ask a question to Blobert" });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((builder) =>
          builder //
            .setName("question")
            .setDescription("Ask a question")
            .setRequired(true)
        )
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const question = interaction.options.getString("question");

    await interaction.deferReply();

    const response = await getPrediction(questionStatement, question as string);

    return interaction.editReply({
      content: response,
    });
  }
}
