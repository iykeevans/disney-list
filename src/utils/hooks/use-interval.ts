import { useEffect, useCallback } from "react";

const useInterval = (callback: () => void, delay: number | null) => {
  // Set up the interval.

  const cb = useCallback(callback, [callback]);
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      cb();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay, cb]);
};

export default useInterval;
