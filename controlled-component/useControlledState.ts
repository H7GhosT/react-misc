import React, { SetStateAction } from "react";
import { useStateRef } from "./useStateRef";

export function useControlledState<T>(
  value: T | undefined,
  onChange: React.Dispatch<T> | undefined,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>];

export function useControlledState<T>(
  value: T | undefined,
  onChange: React.Dispatch<T | undefined> | undefined,
  defaultValue: T | undefined,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];

/**
 * Hook for providing a fallback to a internal state when a component doesn't have
 * a controlled value and/or change listener in props
 */
export function useControlledState<T>(
  value: T | undefined,
  onChange: React.Dispatch<T | undefined> | undefined,
  defaultValue: T | undefined,
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  //
  const [internalState, setInternalState] = React.useState(defaultValue);
  const resultValue = value === undefined ? internalState : value;

  // In case the setState will be called many times in a row with callback as argument
  const currentValueRef = useStateRef(resultValue);

  const dispatch = (v: SetStateAction<T | undefined>) =>
  (currentValueRef.current =
    v instanceof Function ? v(currentValueRef.current) : v);

  return [
    resultValue,
    onChange === undefined
      ? value === undefined
        ? setInternalState
        : () => { }
      : value === undefined
        ? (v) => {
          setInternalState(v);
          onChange(dispatch(v));
        }
        : (v) => {
          onChange(dispatch(v));
        },
  ];
}
