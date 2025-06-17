export {}
export type Color = [number, number, number]
export function formatColorToCss(color: Color, opacity = 1) {
    return "rgb(" + color.map(v => Math.round(v)).join(",") + "," + opacity + ")"
}
export function multiplyColor(color: Color, factor: number): Color {
    return color.map(v => v * factor) as Color
}
export function colorToHexCode(color: Color) {
    return color.map((val) => val.toString(16).padStart(2, "0")).join("")
}

export function hexCodeToColor(hex: string): Color|null {
    if (hex[0] == "#") hex = hex.slice(1)
    hex = hex.toUpperCase()
    if (hex.length != 6) {
        return null
    }
    const allowedCharacters = "1234567890ABCDEF"
    for (let ch of hex.split("")) {
        if (!(allowedCharacters.includes(ch))) {
            return null
        }
    }
    return [parseInt(hex.substring(0, 2), 16), parseInt(hex.substring(2, 4), 16), parseInt(hex.substring(4, 6), 16)]
}