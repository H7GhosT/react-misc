import { Button, Divider, TextField } from "@material-ui/core";
import { Memo } from "Memo";
import React from "react";

export const TestMemo = () => {
  console.log("Container rendered");

  const [, rerender] = React.useState(0);
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Button onClick={() => rerender(Math.random())}>
        Rerender container
      </Button>
      <Divider />
      <TextField
        onChange={(e) => setCount(Number(e.target.value))}
        type="number"
      />
      <Divider />
      <Memo deps={[count]}>
        <HeavyToRenderList count={count} />
      </Memo>
    </>
  );
};

export const HeavyToRenderList = ({ count }: { count: number }) => {
  console.log("Heavy to render list rendered");

  return (
    <ol>
      {new Array(count).fill(null).map((_, i) => (
        <li>List item {i + 1}</li>
      ))}
    </ol>
  );
};
