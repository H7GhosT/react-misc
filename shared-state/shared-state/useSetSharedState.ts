import { useContext, useMemo } from "react";
import { SharedState } from "./types";

/**
 * Hook for just setting a shared state without updating the current component
 */
export function useSetSharedState<T>(
  context: React.Context<SharedState.ContextValue<T>>,
): React.Dispatch<React.SetStateAction<T>> {
  //
  const contextValue = useContext(context);

  return useMemo(
    () => (newState) => {
      //
      newState instanceof Function
        ? (contextValue.sharedState = newState(contextValue.sharedState))
        : (contextValue.sharedState = newState);

      contextValue.subscribers.forEach((s) => s());
    }, []);
}
