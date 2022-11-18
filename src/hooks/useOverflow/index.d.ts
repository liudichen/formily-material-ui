interface IRef {
  current?: HTMLElement,
}

interface Result {
  overflow: boolean,
  containerRef: IRef,
  contentRef: IRef
}

export declare const useOverflow: () => Result;
