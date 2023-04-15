const COLORS = ['bg-sky-600', 'bg-pink-600', 'bg-red-500', 'bg-purple-600', 'bg-red-600'];

export const getRandomBrandColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const getInitials = (text: string) =>
  text
    .split(' ')
    .map((textItem) => textItem.charAt(0))
    .join('')
    .replace(/[\W_]+/g, '');

export const getTypeAmount = (type: string, total: number) =>
  `${total} ${type.charAt(0).toUpperCase()}${type.slice(1)}${total > 1 ? 's' : ''}`;
