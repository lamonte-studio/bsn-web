export const truncateText = (
  text: string,
  maxLength: number = 100,
  ellipsis: string = '...',
): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + ellipsis;
};

export const getFirstWord = (text: string): string => {
  const words = text.trim().split(/\s+/);
  return words.length > 0 ? words[0] : '';
};
