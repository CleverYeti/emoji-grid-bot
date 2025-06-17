import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { DynamicResponse } from "../functions/DynamicResponse";
import { askForConfirmation } from "../functions/askForConfirmation";
import { createCanvas, Image, loadImage } from "canvas";

const emojiDimensions = 128

export const data = new SlashCommandBuilder()
  .setName("createemojigrid")
  .setDescription("Create grid of emojis from image")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .addStringOption(option =>
    option
      .setName('name')
			.setDescription('The emoji name')
      .setRequired(true)
  )
  .addAttachmentOption(option =>
		option
      .setName('image')
			.setDescription('The image')
      .setRequired(true)
  )
  .addIntegerOption(option =>
		option
      .setName('width')
			.setDescription('Width of the grid in emojis')
      .setRequired(true)
  )
  .addIntegerOption(option =>
		option
      .setName('height')
			.setDescription('Height of the grid in emojis')
      .setRequired(true)
  )
 
export async function execute(interaction: CommandInteraction) {
  try {
    
    let count = 0
    let progress = 0
    if (interaction.guild == null) return interaction.reply("Needs to be executed in a server");
    let imageAttachment = (interaction as any).options.getAttachment("image")
    let name = (interaction as any).options.getString("name").replaceAll(" ", "_")
    let width = (interaction as any).options.getInteger("width")
    let height = (interaction as any).options.getInteger("height")
    console.log(width, height, imageAttachment)
    const guild = interaction.guild
    let responseContents = ""
    askForConfirmation(interaction, `Are you sure you want to add ${width * height} emojis to this server`, async () => {
      const imageDimensions = 0
      const count = width * height
      const response = new DynamicResponse(interaction, [`Adding ${count} Emojis`, `(${progress}/${count})`], false)
      ;(async () => {
        let image: Image
  
        try {
          const response = await fetch(imageAttachment.attachment);
          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          image = await loadImage(buffer);
        } catch (error) {
          response.addRow("failed loading image")
          return
        }
  
        for (let y = 0; y < height; y++) {
          if (y != 0) responseContents += "\n"
          for (let x = 0; x < width; x++) {
  
            const canvas = createCanvas(emojiDimensions, emojiDimensions);
            const context = canvas.getContext('2d');
            const maxWidth = emojiDimensions * width
            const maxHeight = emojiDimensions * height
            const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
            const scaledWidth = image.width * scale;
            const scaledHeight = image.height * scale;
            const xOffset = (maxWidth - scaledWidth) / 2;
            const yOffset = (maxHeight - scaledHeight) / 2;
  
            context.drawImage(image, xOffset - x * emojiDimensions , yOffset - y * emojiDimensions, scaledWidth, scaledHeight);
  
            const emojiName = `${name}_${y}_${x}`
            const emoji = await guild.emojis.create({
              name: emojiName,
              attachment: canvas.toDataURL()
            }).catch((err) => {
              response.replaceLastLine("error creating emoji: " + emojiName, false)
              response.addRow(`(${progress}/${count})`)
              console.error(err)
            })
            responseContents += `${emoji}`
            progress++
            response.replaceLastLine(`(${progress}/${count})`)
          }
        }
        response.replaceResponse([`${responseContents}`])
      })()
    })
  } catch (error) {
    console.error("bot error", error)
  }
}
