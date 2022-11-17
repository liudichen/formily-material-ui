import { useEffect, useRef } from 'react';
import { useSafeState } from 'ahooks';

export const useOverflow = (deps = []) => {
  const [ overflow, setOverflow ] = useSafeState(false);
  const containerRef = useRef();
  const contentRef = useRef();
  useEffect(() => {
    requestAnimationFrame(() => {
      const contentWidth = contentRef.current?.getBoundingClientRect()?.width;
      const containerWidth = containerRef.current?.getBoundingClientRect()?.width;
      if (contentWidth && containerWidth && containerWidth < contentWidth) {
        if (!overflow) setOverflow(true);
      } else {
        if (overflow) setOverflow(false);
      }
    });
  }, [ ...deps ]);

  return {
    overflow,
    containerRef,
    contentRef,
  };
};
