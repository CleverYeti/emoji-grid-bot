import { CommandInteraction } from "discord.js";

export class DynamicResponse {
  interaction: CommandInteraction
  rows: Array<string> = []
  constructor(interaction: CommandInteraction, initialEntries: Array<string>, createReply: boolean) {
    this.interaction = interaction
    this.rows = initialEntries
    if (createReply) {
      interaction.reply(this.rows.join("\n"))
    } else {
      interaction.editReply(this.rows.join("\n"))
    }
  }
  addRow(row: string, send = true) {
    this.rows.push(row)
    if (!send) return
    this.interaction.editReply(this.rows.join("\n"))
  }
  replaceResponse(rows: Array<string>, send = true) {
    this.rows = rows
    if (!send) return
    this.interaction.editReply(this.rows.join("\n"))
  }
  replaceLastLine(row: string, send = true) {
    this.rows.pop()
    this.rows.push(row)
    if (!send) return
    this.interaction.editReply(this.rows.join("\n"))
  }
}