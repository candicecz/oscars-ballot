import { useState, useEffect } from "react";

const useInterval = (handler: () => any, interval: number) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (interval !== null) {
      const id = setInterval(handler, interval);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [handler, interval]);

  return () => intervalId && clearInterval(intervalId);
};

export default useInterval;
