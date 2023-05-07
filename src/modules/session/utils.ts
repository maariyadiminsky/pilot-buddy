export const getArrWithDataBackInOrder = (index: number, data: any, arr?: any[]) =>
  arr && arr.length ? [...arr.slice(0, index), data, ...arr.slice(index)] : [...(arr || []), data];
