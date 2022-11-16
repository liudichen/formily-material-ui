import { useState, useEffect, useRef } from 'react';

export const useOverflow = (deps) => {
  const [ overflow, setOverflow ] = useState(false);
  const containerRef = useRef();
  const contentRef = useRef();
  const dependencies = JSON.stringify(deps);
  useEffect(() => {
    requestAnimationFrame(() => {
      const contentWidth = contentRef.current.getBoundingClientRect().width;
      const containerWidth =
          containerRef.current.getBoundingClientRect().width;
      if (contentWidth && containerWidth && containerWidth < contentWidth) {
        if (!overflow) setOverflow(true);
      } else {
        if (overflow) setOverflow(false);
      }
    });
  }, [ dependencies ]);

  return {
    overflow,
    containerRef,
    contentRef,
  };
};
