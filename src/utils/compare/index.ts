export const isEqual = (a?: any, b?: any) => {
  return [ 'number', 'string' ].includes(typeof (a ?? 0))
    ? a === b
    : JSON.stringify(a) === JSON.stringify(b);
};

export const isInArray = (value: any, array: any[]) => {
  if (!array || !Array.isArray(array)) return false;
  return [ 'number', 'string' ].includes(typeof (value ?? 0))
    ? array.includes(value)
    : array.some(item => isEqual(value, item));
};
