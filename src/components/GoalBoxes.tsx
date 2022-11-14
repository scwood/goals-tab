import { Checkbox, Group } from "@mantine/core";

import { Goal } from "./Goal";

export interface GoalBoxesProps {
  goal: Goal;
  onTimesCompletedChanged: (goal: Goal, timesCompleted: number) => void;
}

export function GoalBoxes(props: GoalBoxesProps) {
  const { goal, onTimesCompletedChanged } = props;

  return (
    <Group spacing={6}>
      {Array.from({ length: goal.timesPlanned }).map((_, i) => {
        const completed = i < goal.timesCompleted;
        return (
          <Checkbox
            key={i}
            size="xl"
            color="green"
            checked={completed}
            onChange={(event) => {
              onTimesCompletedChanged(
                goal,
                event.target.checked
                  ? goal.timesCompleted + 1
                  : goal.timesCompleted - 1
              );
            }}
          />
        );
      })}
    </Group>
  );
}
