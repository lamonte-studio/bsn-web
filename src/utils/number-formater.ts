export const ordinalNumber = (num: number): string => {
  if (num == null) {
    return '';
  }

  if (num === 1) return '1er';
  if (num === 2) return '2do';
  if (num === 3) return '3er';
  if (num === 4) return '4to';
  if (num === 5) return '5to';
  if (num === 6) return '6to';
  if (num === 7) return '7mo';
  if (num === 8) return '8vo';
  if (num === 9) return '9no';
  if (num === 10) return '10mo';
  if (num === 11) return '11vo';
  if (num === 12) return '12vo';
  if (num === 13) return '13vo';
  if (num === 14) return '14vo';
  if (num === 15) return '15vo';
  if (num === 16) return '16vo';
  if (num === 17) return '17mo';
  if (num === 18) return '18vo';
  if (num === 19) return '19no';
  if (num === 20) return '20mo';
  return `${num}º`;
};
