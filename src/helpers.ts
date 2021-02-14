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

export const removeSmartQuotes = (str: string): string => {
  const regex = new RegExp(`${String.fromCharCode(8220)}|${String.fromCharCode(8221)}`, 'g');
  return str.replace(regex, String.fromCharCode(34));
};

// Takes a text fraction and returns its unicode char
// i.e. "1/2" => "½"
const convertFraction = (str: string): string => {
  const fractionLookup: Record<string, number> = {
    '1/2': 189,
    '1/4': 188,
    '3/4': 190,
    '1/3': 8531,
    '2/3': 8532,
    '1/5': 8533,
    '1/8': 8539,
    '3/8': 8540,
    '5/8': 8541,
    '7/8': 8542,
  };
  if (str in fractionLookup) {
    return String.fromCharCode(fractionLookup[str]);
  } else {
    console.log(`Got the fraction ${str} which we didn't account for.`);
    return str;
  }
};

export const replaceFractions = (str: string): string => {
  const regex = /(^|[^0-9/])(?<frac>[12357]\/[23458])([^0-9/]|$)/;

  let fraction = str.match(regex)?.groups?.frac;
  while (fraction) {
    const converted = convertFraction(fraction);
    str = str.replace(regex, `$1${converted}$3`);
    fraction = str.match(regex)?.groups?.frac;
  }

  const compoundRegex = /([0-9])[\s-]([½¼¾⅓⅔⅕⅛⅜⅝⅞])/;
  // Replace i.e. 1 1/4 and 1-1/4 with 1¼
  let compoundFraction = str.match(compoundRegex);
  while (compoundFraction) {
    str = str.replace(compoundRegex, '$1$2');
    compoundFraction = str.match(compoundRegex);
  }

  return str;
};
