import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonInteraction, ButtonStyle, CommandInteraction, ComponentType, MessageFlags } from "discord.js";


export async function askForConfirmation(interaction: CommandInteraction, confirmText: string, confirmCallback: () => void) {
  const message = await interaction.reply({
    content: confirmText,
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Yes')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('No')
          .setStyle(ButtonStyle.Secondary)
      )
    ] as any,
    
    flags: MessageFlags.Ephemeral,
  });

  // Set up a collector to handle button clicks
  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 15_000, // 15 seconds
    max: 1,
  });
  
  collector.on('collect', async i => {
    if (i.user.id !== interaction.user.id) {
      return i.reply({ content: 'This is not your confirmation.', ephemeral: true });
    }
  
    if (i.customId === 'confirm') {
      await i.update({ content: 'Executing Action other', components: [] });
      confirmCallback()
    } else {
      await i.update({ content: 'Action canceled.', components: [] });
    }
  });
  
  collector.on('end', collected => {
    if (collected.size === 0) {
      interaction.editReply({ content: 'No response. Action canceled.', components: [] });
    }
  });
}