import { isInArray } from '@iimm/shared';

const intersection = (a: any[] = [], b: any[] = []) => {
  return a.filter(item => isInArray(item, b));
};
const not = (a: any[] = [], b: any[] = []) => {
  return a.filter(item => !isInArray(item, b));
};

const union = (a: any[] = [], b: any[] = []) => {
  return [ ...a, ...not(b, a) ];
};

export {
  intersection,
  not,
  union,
};
