import React, { createContext, useContext, useState } from "react";
import { SharedState } from "./interface";

/**
 * Hook for sharing a state between components in a context provider
 * with only rerendering the components using the hook
 */
export function useSharedState<TSharedState>(
  context: React.Context<SharedState.ContextValue<TSharedState>>
): [TSharedState, React.Dispatch<React.SetStateAction<TSharedState>>] {
  //
  const contextValue = useContext(context);
  // this state will be updated as the shared state
  const [localState, setLocalState] = useState(contextValue.sharedState);

  React.useEffect(() => {
    // udpate function will be called when the shared state changes
    const update = () => setLocalState(contextValue.sharedState);
    contextValue.subscribers.push(update);

    return () => {
      // remove the update function when component unmounts
      const idx = contextValue.subscribers.indexOf(update);
      idx > -1 && contextValue.subscribers.splice(idx, 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    localState,
    (newState) => {
      //
      newState instanceof Function
        ? (contextValue.sharedState = newState(contextValue.sharedState))
        : (contextValue.sharedState = newState);

      contextValue.subscribers.forEach((s) => s());
    },
  ];
}

/**
 * Hook for just setting a shared state without updating the current component
 */
export function useSetSharedState<T>(
  context: React.Context<SharedState.ContextValue<T>>
): React.Dispatch<React.SetStateAction<T>> {
  //
  const contextValue = useContext(context);

  return (newState) => {
    //
    newState instanceof Function
      ? (contextValue.sharedState = newState(contextValue.sharedState))
      : (contextValue.sharedState = newState);

    contextValue.subscribers.forEach((s) => s());
  };
}

export function configureSharedState<T>(
  defaultValue: T
): SharedState.Config<T> {
  //
  const Context = createContext<SharedState.ContextValue<T>>({
    sharedState: defaultValue,
    subscribers: [],
  });

  const Provider: React.FC<SharedState.ProviderProps<T>> = ({
    children,
    initialValue,
  }) => {
    const [value] = useState({
      sharedState: initialValue,
      subscribers: [],
    });
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return {
    Context,
    Provider,
  };
}
