export const countOccurrences = (char: string, str: string): number => {
  let count = 0;
  let rem = str;
  while (rem.includes(char)) {
    count++;
    rem = rem.slice(rem.indexOf(char) + 1);
  }
  return count;
};

export const trimAndRemoveEmpty = (arr: string[]): string[] => {
  return arr.filter((el) => !!el).map((el) => el.trim());
};
