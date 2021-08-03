import { Divider } from "@material-ui/core";
import { Input } from "./ControlledComponent";
import { useState } from "react";

export const TestControlledComponent = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <h4>No props</h4>
      <Input />
      <Divider />
      <h4>Fixed value</h4>
      <Input value="just value" />
      <Divider />
      <h4>Fixed value but has onChange</h4>
      <Input
        value="just value but has on change"
        onChange={(v: any) => console.log(v)}
      />
      <Divider />
      <h4>Just onChange</h4>
      <Input onChange={(v: any) => console.log(v)} />
      <Divider />
      <h4>value and onChange from useState</h4>
      <Input value={value} onChange={setValue} />
      <Divider />
    </>
  );
};
