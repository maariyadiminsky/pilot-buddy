export const getInitials = (text: string) =>
  text
    .split(' ')
    .map((textItem) => textItem.charAt(0))
    .join('')
    .replace(/[\W_]+/g, '');

export const getTypeAmount = (type: string, total: number) =>
  `${total} ${type.charAt(0).toUpperCase()}${type.slice(1)}${total > 1 ? 's' : ''}`;
