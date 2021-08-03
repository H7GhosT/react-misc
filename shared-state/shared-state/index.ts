import React, { createContext, useContext, useState } from "react";

export interface SharedStateContextValue<TSharedState> {
  sharedState: TSharedState;
  subscribers: (() => void)[];
}

/**
 * Hook for sharing a state between components in a context provider
 * with only rerendering the components using the hook
 */
export function useSharedState<TSharedState>(
  context: React.Context<SharedStateContextValue<TSharedState>>
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
export function useSetSharedState<TSharedState>(
  context: React.Context<SharedStateContextValue<TSharedState>>
): React.Dispatch<React.SetStateAction<TSharedState>> {
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

export interface ConfigureSharedStateResult<TSharedState> {
  Context: React.Context<SharedStateContextValue<TSharedState>>;
  Provider: React.FC;
}

export function configureSharedState<TSharedState>(
  initialValue: TSharedState
): ConfigureSharedStateResult<TSharedState> {
  //
  const Context = createContext<SharedStateContextValue<TSharedState>>({
    sharedState: initialValue,
    subscribers: [],
  });

  return {
    Context,
    Provider: ({ children }) => {
      const [value] = useState({
        sharedState: initialValue,
        subscribers: [],
      });
      return <Context.Provider value={value}>{children}</Context.Provider>;
    },
  };
}
