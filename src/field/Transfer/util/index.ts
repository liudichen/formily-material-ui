import { isInArray, CompareOptions } from '@iimm/shared';

/** 获取a和b的交集 */
const intersection = (a: any[] = [], b: any[] = [], compareOptions?: CompareOptions) => {
  return a.filter((item) => isInArray(item, b, compareOptions));
};

/** 获取a中不在b中的元素 */
const not = (a: any[] = [], b: any[] = [], compareOptions?: CompareOptions) => {
  return a.filter((item) => !isInArray(item, b), compareOptions);
};

/** 获取a + b中与a不同的元素，即ab的并集 */
const union = (a: any[] = [], b: any[] = [], compareOptions?: CompareOptions) => {
  return [ ...a, ...not(b, a, compareOptions) ];
};

export {
  intersection,
  not,
  union,
};
