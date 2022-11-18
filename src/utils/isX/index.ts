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

export const isObject = (value: any) => value !== null && typeof value === 'object';
export const isFunction = (value: any) => typeof value === 'function';
export const isString = (value: any) => typeof value === 'string';
export const isNumber = (value: any) => typeof value === 'number';
export const isUndefined = (value: any) => typeof value === 'undefined';


export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
export const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
