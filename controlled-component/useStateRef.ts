import React from "react";

/**
 * Instantly set and get reference to some state or value
 */
export function useStateRef<T>(currentValue: T) {
  const ref = React.useRef(currentValue);
  ref.current = currentValue;
  return ref;
}
