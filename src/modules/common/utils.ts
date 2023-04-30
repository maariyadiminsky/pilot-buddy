export const getUniqId = () =>
  window?.crypto?.randomUUID()?.slice(16) ||
  // backup incase former fails due to unexpected browser issues (but it shouldn't)
  'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, () => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });

export const truthyString = (...classes: (string | undefined | boolean)[]) =>
  classes.filter(Boolean).join(' ');

export const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

// more efficient then simply filtering
export const removeObjectFromArray = (
  array: any[],
  valueToRemove: string | number,
  keyToCheck?: string
) => {
  const isArrayItemsAnObject = typeof array[0] === 'object';

  // ignore arrays as values as this is a shallow removal
  if ((!keyToCheck && isArrayItemsAnObject) || Array.isArray(array[0])) return array;

  const indexOfItemToRemove = array.findIndex(
    (item) => (keyToCheck && isArrayItemsAnObject ? item[keyToCheck] : item) === valueToRemove
  );

  return indexOfItemToRemove === -1
    ? array
    : [...array.slice(0, indexOfItemToRemove), ...array.slice(indexOfItemToRemove + 1)];
};

export const removeLineBreaksFromText = (text: string) => text.replace(/(\r\n|\n|\r)/gm, ' ');

export const jumpPageToTop = () => window.scrollTo(0, 0);

// note: not full proof but helps with most common cases
export const includeProtocolAndHostWithinLink = (link: string) => {
  if (link.includes('https://www') && link.includes('com')) return link;
  if (link.includes('https://www')) return `${link}.com`;
  if (link.includes('www') && link.includes('com')) return `https://${link}`;
  if (link.includes('www')) return `https://${link}.com`;
  return `https://www.${link}.com`;
};
