import { useEffect, useRef } from 'react';
import { useSafeState, useSize } from 'ahooks';

export const useOverflow = (threhod = 0) => {
  const [ overflow, setOverflow ] = useSafeState(false);
  const containerRef = useRef();
  const contentRef = useRef();
  const containerSize = useSize(containerRef);
  const containerWidth = containerSize?.width;
  useEffect(() => {
    requestAnimationFrame(() => {
      const contentWidth = contentRef.current?.getBoundingClientRect()?.width;
      if (contentWidth && containerWidth && (containerWidth < contentWidth + threhod)) {
        if (!overflow) setOverflow(true);
      } else {
        if (overflow) setOverflow(false);
      }
    });
  }, [ containerWidth ]);

  return {
    overflow,
    containerRef,
    contentRef,
  };
};
