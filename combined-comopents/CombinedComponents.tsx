import React from "react";

export interface CombinedComponentsProps {
  components: React.FC[];
}

export const CombinedComponents: React.FC<CombinedComponentsProps> = ({
  components,
  ...props
}) => {
  const Component = components.reduce(
    (Prev, Current): React.FC =>
      ({ children }) =>
        (
          <Prev>
            <Current>{children}</Current>
          </Prev>
        ),
    (({ children }) => <>{children}</>) as React.FC
  );
  return <Component {...props} />;
};
