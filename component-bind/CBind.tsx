/**
 * CBind stands for Bind compenent
 * Bind to a component some props
 */
 export const CBind = <Props extends object, BoundProps extends Partial<Props>>(
  Component: React.FC<Props>,
  boundProps: BoundProps
): React.FC<Omit<Props, keyof BoundProps>> => {
  return ({ children, ...remainingProps }) => (
    <Component {...boundProps} {...(remainingProps as Props)}>
      {children}
    </Component>
  );
};

