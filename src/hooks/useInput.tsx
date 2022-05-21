import { useState, useCallback } from "react";

export function useInput(initialValue: any): any {
  const [value, setInputValues] = useState<any>(initialValue);

  const setInput = useCallback((value: any) => {
    setInputValues(() => value);
  }, []);
  return [value, setInput];
}
