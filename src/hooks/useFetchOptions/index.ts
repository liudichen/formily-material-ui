import { useEffect } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';

import { IFieldOptionItem, IFieldPropOptions, IFieldPropOptionItem } from '../../types';

interface IUseFieldOptionsConfig {
  /** 外部管理Loading状态：setLoading */
  onLoading?: (loading: boolean) => void,
  /** 获取完options后进行的其他操作，不会影响返回options，为options的副作用 */
  callback?: (options: IFieldOptionItem[]) => void,
  /** 更新依赖项数组,不需要传递optionsProp,optionsProp会默认加入 */
  deps?: any,
}

export const useFetchOptions = (optionsProp?: IFieldPropOptions, config: IUseFieldOptionsConfig = {}) => {
  const { onLoading, callback, deps } = config;
  const [ options, setOptions ] = useSafeState<IFieldOptionItem[]>([]);
  const getOptions = useMemoizedFn(async () => {
    let result: IFieldPropOptionItem[] = [];
    onLoading?.(true);
    try {
      if (Array.isArray(optionsProp) && optionsProp.length) {
        result = [ ...optionsProp ];
      }
      if (!result.length && typeof optionsProp === 'function') {
        const res = await optionsProp();
        if (Array.isArray(res)) { // 如果结果不是Array则直接丢弃
          result = [ ...res ];
        }
      }
      result = result.map(item => (typeof item === 'object' ? item : { value: item, label: `${item}` }));
      onLoading?.(false);
      setOptions(result as IFieldOptionItem[]);
      callback?.(result as IFieldOptionItem[]);
    } catch (error) {
      onLoading?.(false);
    }
  });
  useEffect(() => {
    getOptions();
  }, [ optionsProp, deps ]);
  return options;
};
