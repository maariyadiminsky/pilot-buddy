import uniqueId from 'lodash/uniqueId';

export const getUniqId = (text?: string) => uniqueId(text);

export const truthyString = (...classes: (string | undefined | boolean)[]) =>
  classes.filter(Boolean).join(' ');

export const removeLineBreaksFromText = (text: string) => text.replace(/(\r\n|\n|\r)/gm, ' ');

// note: not full proof but helps with most common cases
export const includeProtocolAndHostWithinLink = (link: string) => {
  if (link.includes('https://www')) return link;

  if (link.includes('www')) return `https://${link}`;

  return `https://www.${link}`;
};
