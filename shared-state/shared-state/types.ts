export declare namespace SharedState {
  export interface ContextValue<T> {
    sharedState: T;
    subscribers: (() => void)[];
  }

  export interface ProviderProps<T> {
    initialValue: T;
  }

  export interface Config<T> {
    Context: React.Context<ContextValue<T>>;
    Provider: React.FC<ProviderProps<T>>;
  }
}
