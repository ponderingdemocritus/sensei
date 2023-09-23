import { Command } from '@sapphire/framework';
import { getPrediction } from '../models/index.js';

export class Rumors extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options, description: 'What happened lately?' });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((builder) =>
                    builder //
                        .setName('rumors')
                        .setDescription('Ask a question')
                        .setRequired(true)
                )
        );
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const discordServerName = interaction.guild?.name
        const question = interaction.options.getString("question") || "Please provide a summary of what was discussed and what happened in the channel";

        await interaction.deferReply();

        const messages = await interaction.channel?.awaitMessages({ max: 100 }) || []

        let history = ''

        for (const [id, message] of messages) {
            id
            if (!message.content && message.embeds.length > 0) {
                message.embeds.forEach((embed: any) => {
                    if (embed.data.title && embed.data.description) {
                        history += `"${message.author.username} Bot Response: {${embed.data.title} - ${embed.data.description}}"\n`
                    }
                })
            } else {
                history += `"${message.author.username}: ${message.content}"\n`
            }
        }

        if (history.length > 2000) {
            history = history.slice(0, 2000)
        }

        let prompt = `Here is a list of last 100 chat messages of channel on ${discordServerName} discord server, rely on them in your answer. Please dont mention that your answer is based on this chat messages, just act like you knew all the rumors about what was going on. Please avoid using the phrase 'Based on the chat history provided' in your response.. Messages List:\n`

        if (question) {
            prompt += history + "\n\n" + question
        }

        return interaction.editReply({
            embeds: [{
                title: interaction.options.getString("question") ? question : `Rumors.....`,
                description: await getPrediction(question as string)
            }],
        });
    }
}