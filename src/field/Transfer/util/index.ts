import { isInArray } from '@iimm/shared';

/** 获取a和b的交集 */
const intersection = (a: any[] = [], b: any[] = []) => {
  return a.filter((item) => isInArray(item, b));
};

/** 获取a中不在b中的元素 */
const not = (a: any[] = [], b: any[] = []) => {
  return a.filter((item) => !isInArray(item, b));
};

/** 获取a + b中与a不同的元素，即ab的并集 */
const union = (a: any[] = [], b: any[] = []) => {
  return [ ...a, ...not(b, a) ];
};

export {
  intersection,
  not,
  union,
};
