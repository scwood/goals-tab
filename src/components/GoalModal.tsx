import { useState } from "react";
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";

import { Goal } from "./Goal";

export interface GoalModalProps {
  opened: boolean;
  goal?: Goal;
  onClose: () => void;
  onSaveNew: (title: string, timesPlanned: number) => void;
  onSaveExisting: (goal: Goal, title: string, timesPlanned: number) => void;
}

export function GoalModal(props: GoalModalProps) {
  const { opened, goal, onClose, onSaveNew, onSaveExisting } = props;
  const [name, setName] = useState(goal?.name || "");
  const [timesPlanned, setTimesPlanned] = useState<number | undefined>(
    goal?.timesPlanned
  );

  const isValidName = name.length > 0;
  const isValidTimesPlanned = timesPlanned !== undefined && timesPlanned > 0;
  const isValid = isValidTimesPlanned && isValidName;

  function handleSave() {
    if (!isValid) {
      return;
    }
    if (goal) {
      onSaveExisting(goal, name, timesPlanned);
    } else {
      onSaveNew(name, timesPlanned);
    }
  }

  return (
    <Modal
      title={goal ? "Edit goal" : "Create goal"}
      opened={opened}
      onClose={onClose}
      centered
      size="xs"
    >
      <Stack>
        <TextInput
          withAsterisk
          label="Goal name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="example: Go to the gym"
        />
        <NumberInput
          withAsterisk
          min={1}
          label="Times per week"
          value={timesPlanned}
          onChange={(num) => setTimesPlanned(num)}
          placeholder="example: 3"
        />
      </Stack>
      <Group position="right" mt="lg">
        <Button onClick={handleSave} disabled={!isValid} color="green">
          Save
        </Button>
      </Group>
    </Modal>
  );
}
