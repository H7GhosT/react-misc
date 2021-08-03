import { useControlledState } from "./useControlledState";

export const Input = ({ value, onChange }: any) => {
  const [state, setState] = useControlledState(value, onChange, "");

  return <input value={state} onChange={(e) => setState(e?.target?.value)} />;
};
