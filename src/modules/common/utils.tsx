import uniqueId from 'lodash/uniqueId';

export const getUniqId = (text?: string) => uniqueId(text);

export const truthyString = (...classes: (string | undefined | boolean)[]) =>
  classes.filter(Boolean).join(' ');

// more efficient then simply filtering
export const removeObjectFromArray = (
  array: any[],
  valueToRemove: string | number,
  keyToCheck?: string
) => {
  const isArrayItemsAnObject = typeof array[0] === 'object';

  if ((!keyToCheck && isArrayItemsAnObject) || Array.isArray(array[0])) return array;

  const indexOfItemToRemove = array.findIndex(
    (item) => (keyToCheck && isArrayItemsAnObject ? item[keyToCheck] : item) === valueToRemove
  );

  return indexOfItemToRemove === -1
    ? array
    : [...array.slice(0, indexOfItemToRemove), ...array.slice(indexOfItemToRemove + 1)];
};

export const removeLineBreaksFromText = (text: string) => text.replace(/(\r\n|\n|\r)/gm, ' ');

// note: not full proof but helps with most common cases
export const includeProtocolAndHostWithinLink = (link: string) => {
  if (link.includes('https://www') && link.includes('com')) return link;
  if (link.includes('https://www')) return `${link}.com`;
  if (link.includes('www') && link.includes('com')) return `https://${link}`;
  if (link.includes('www')) return `https://${link}.com`;
  return `https://www.${link}.com`;
};
