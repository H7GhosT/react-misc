import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Paper,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import { CombinedComponents } from "CombinedComponents";
import { useState } from "react";

import {
  configureSharedState,
  useSetSharedState,
  useSharedState,
} from "shared-state";

const { Provider: CounterStateProvider, Context: CounterStateContext } =
  configureSharedState(0);

const {
  Provider: ConfirmModalStateProvider,
  Context: ConfirmModalStateContext,
} = configureSharedState({ open: false, id: 0 });

export function TestSharedState() {
  return (
    <>
      <CombinedComponents
        components={[CounterStateProvider, ConfirmModalStateProvider]}
      >
        <Buttons />
        <br />
        <HeavyToRenderList />
      </CombinedComponents>
    </>
  );
}

export function Buttons() {
  const setCounterState = useSetSharedState(CounterStateContext);
  const setModalState = useSetSharedState(ConfirmModalStateContext);

  const [id, setId] = useState(0);

  const onChangeHandler = (event: any) => {
    setId(event.target.value);
  };

  console.log("Buttons rendered");

  return (
    <>
      <Box m={3}>
        <Paper elevation={3}>
          <Box p={3}>
            <Button onClick={() => setCounterState((prev) => prev + 1)}>
              Increment
            </Button>
            <Button
              onClick={() => {
                setCounterState((p) => p + 1);
                setCounterState((p) => p + 1);
              }}
            >
              Increment twice
            </Button>
            <Button
              onClick={() => {
                setCounterState(10);
                setCounterState((p) => p + 3);
                setCounterState((p) => p * 2);
              }}
            >
              =10, +3, *2
            </Button>
            <Button onClick={() => setModalState({ open: true, id })}>
              Open modal with {id}
            </Button>
            <FormControl onChange={onChangeHandler}>
              <TextField type="number" />
            </FormControl>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export function HeavyToRenderList() {
  console.log("Heavy to render list rendered");

  const listItems = new Array(1000)
    .fill(null)
    .map((_, i) => <ListItem>List item {i}</ListItem>);

  return (
    <>
      <Typography variant="h4">
        Heavy to render list, counter: <Counter />
      </Typography>
      <ConfirmDialog />
      <Divider />
      <List>{listItems}</List>
      <Buttons />
    </>
  );
}

export function Counter() {
  console.log("counter rendered");

  const [value] = useSharedState(CounterStateContext);

  return (
    <>
      <Chip label={<>Value: {value}</>} />
    </>
  );
}

export function ConfirmDialog() {
  const [{ open, id }, setOpen] = useSharedState(ConfirmModalStateContext);

  const onCloseHandler = () => setOpen({ open: false, id: 0 });

  return (
    <Dialog
      open={open}
      onClose={onCloseHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm id:{id}?</DialogTitle>
      <DialogActions>
        <Button onClick={onCloseHandler} color="primary">
          Cancel
        </Button>
        <Button onClick={onCloseHandler} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
