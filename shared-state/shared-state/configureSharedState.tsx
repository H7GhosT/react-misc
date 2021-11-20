import { createContext, useState } from "react";
import { SharedState } from "./types";

export function configureSharedState<T>(
  defaultValue: T,
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
