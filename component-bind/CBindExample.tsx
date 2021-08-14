export function TestCBind() {
  return (
    <>
      <CombinedComponents
        components={[
          CBind(CounterStateProvider, { initialValue: 0 }),
          CBind(ConfirmModalStateProvider, {
            initialValue: { id: 0, open: false },
          }),
        ]}
      >
      </CombinedComponents>
    </>
  );
}