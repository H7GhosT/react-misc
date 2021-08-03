import React from "react";

/**
 * Hook for providing a fallback to a internal state when a component doesn't have
 * a controlled value and/or change listener in props
 */
export function useControlledState<TValue>(
  value: TValue | undefined,
  onChange: React.Dispatch<TValue> | undefined,
  initialInternalState: TValue
): [TValue, React.Dispatch<TValue>] {
  //
  const [internalState, setInternalState] =
    React.useState(initialInternalState);

  return [
    value === undefined ? internalState : value,
    onChange === undefined
      ? value === undefined
        ? setInternalState
        : () => {}
      : value === undefined
      ? (v: TValue) => {
          setInternalState(v);
          onChange(v);
        }
      : onChange,
  ];
}
