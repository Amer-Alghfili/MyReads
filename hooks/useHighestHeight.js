import { useState, useEffect } from "react";

export function useHighestHeight({ current }) {
  const [max, setMax] = useState();
  useEffect(
    function calculateHeightEffect() {
      if (!current) {
        return;
      }
      const { children } = current;
      const childrenArr = Array.from(children);
      let max = 0;
      for (const { clientHeight } of childrenArr) {
        if (clientHeight > max) {
          max = clientHeight;
        }
      }
      setMax(max);
    },
    [max, current]
  );
  return max;
}
