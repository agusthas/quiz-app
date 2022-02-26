/**
 * Randomizes the order of the values of an array.
 * Using Fisher-Yates algorithm
 * @param arr An array to be shuffled
 * @returns A new shuffled array
 */
export default function shuffle<T>([...arr]: T[]): T[] {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }

  return arr;
}
