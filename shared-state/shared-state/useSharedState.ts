import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import { SharedState } from "./types";

/**
 * Hook for sharing a state between components in a context provider
 * with only rerendering the components using the hook
 */
export function useSharedState<T>(
  context: React.Context<SharedState.ContextValue<T>>,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  //
  const contextValue = useContext(context);
  // this state will be updated as the shared state
  const [localState, setLocalState] = useState(contextValue.sharedState);

  const updateRef = useRef<() => void>();

  if (!updateRef.current) {
    // udpate function will be called when the shared state changes
    updateRef.current = () => setLocalState(contextValue.sharedState);
    contextValue.subscribers.push(updateRef.current);

  }

  useEffect(() => () => {
    // unsubscribe
    contextValue.subscribers = contextValue.subscribers.filter(
      (sub) => sub !== updateRef.current,
    );
  }, [])

  return [
    localState,
    useMemo(
      () => (newState) => {
        //
        newState instanceof Function
          ? (contextValue.sharedState = newState(contextValue.sharedState))
          : (contextValue.sharedState = newState);

        contextValue.subscribers.forEach((s) => s());
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  ];
}
