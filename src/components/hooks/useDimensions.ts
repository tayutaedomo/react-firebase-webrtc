import { RefObject, useEffect, useState } from 'react';

export type Dimensions = {
  width: number;
  height: number;
};

const defaultDimensions: Dimensions = {
  width: 0,
  height: 0,
};

const useDimensions = (targetRef: RefObject<HTMLElement | null>) => {
  let [dimensions, setDimensions] = useState<Dimensions>(defaultDimensions);
  const node = targetRef.current;

  const updateDimensions = (node: HTMLElement | null) => {
    return node === null
      ? defaultDimensions
      : {
          width: node.offsetWidth,
          height: node.offsetHeight,
        };
  };

  dimensions = updateDimensions(node);

  useEffect(() => {
    const resizeDimensions = () => {
      setDimensions(updateDimensions(node));
    };

    window.removeEventListener('resize', resizeDimensions);
    window.addEventListener('resize', resizeDimensions);
  }, [node]);

  return dimensions;
};

export default useDimensions;
