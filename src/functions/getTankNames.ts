import { fixedTankDefinitions, TankDefinition } from "../tankDefinitions";

const limitToOne = false

export function getTankRoleName(tank: TankDefinition) {
  //let roleName = "Diep " + tank.name
  let roleName = tank.name
  //if (!roleName.includes("Tank")) roleName += " Tank"
  return roleName
}
export function getTankEmojiName(tank: TankDefinition) {
  //let emojiName = "diep_" + tank.name.toLowerCase().replace("-", "_").replace(" ", "_")
  let emojiName = "diep_" + tank.name.toLowerCase().replace("-", "_").replace(" ", "_")
  //if (!emojiName.includes("_tank")) emojiName += "_tank"
  return emojiName
}

export const tankRoleNames: Array<string> = []
for (let def of fixedTankDefinitions) {
  if (def?.levelRequirement != 45) continue;
  tankRoleNames.push(getTankRoleName(def));
  if (limitToOne) break
}

export const tankEmojiNames: Array<string> = []
for (let def of fixedTankDefinitions) {
  if (def?.levelRequirement != 45) continue;
  tankEmojiNames.push(getTankEmojiName(def));
  if (limitToOne) break
}