import uniqueId from 'lodash/uniqueId';

export const getUniqId = (text?: string) => uniqueId(text);

export const truthyString = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ');
