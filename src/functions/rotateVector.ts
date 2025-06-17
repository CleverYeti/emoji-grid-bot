export function rotateVector(vector: [number, number], angle: number): [number, number] {
  const [x, y] = vector;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - y * sin, x * sin + y * cos];
}