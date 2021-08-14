import React from "react";

export interface MemoProps {
  deps: React.DependencyList;
}

/**
 * better use React.memo instead
 */
export const Memo: React.FC<MemoProps> = ({ deps, children }) => (
  // eslint-disable-next-line react-hooks/exhaustive-deps
  <>{React.useMemo(() => children, deps)}</>
);
