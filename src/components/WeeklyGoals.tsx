import { useState } from "react";
import { Button, Group, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

import { Goal } from "./Goal";
import { GoalModal } from "./GoalModal";
import { GoalBoxes } from "./GoalBoxes";
import { useWeeklyGoals } from "../hooks/useWeeklyGoals";
import { GoalMenu } from "./GoalMenu";

function swap<T>(arr: T[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function WeeklyGoals() {
  const { goals, createGoal, updateGoal, deleteGoal, setGoals } =
    useWeeklyGoals();
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined);

  const allGoalsComplete =
    goals.length > 0 &&
    goals.every((goal) => goal.timesCompleted === goal.timesPlanned);

  function handleSaveNew(name: string, timesPlanned: number) {
    createGoal(name, timesPlanned);
    handleCloseModal();
  }

  function handleSaveExisting(goal: Goal, name: string, timesPlanned: number) {
    updateGoal(
      goal.id,
      name,
      timesPlanned,
      Math.min(timesPlanned, goal.timesCompleted)
    );
    handleCloseModal();
  }

  function handleOnTimesCompletedChanged(goal: Goal, timesCompleted: number) {
    updateGoal(goal.id, goal.name, goal.timesPlanned, timesCompleted);
  }

  function handleCloseModal() {
    setSelectedGoal(undefined);
    setIsGoalModalVisible(false);
  }

  function handleDelete(goal: Goal) {
    deleteGoal(goal.id);
  }

  function handleEdit(goal: Goal) {
    setSelectedGoal(goal);
    setIsGoalModalVisible(true);
  }

  function handleMoveLeft(goal: Goal) {
    setGoals((prev) => {
      const copy = [...prev];
      const index = copy.findIndex((g) => g.id === goal.id);
      if (index <= 0) {
        return prev;
      }
      swap(copy, index, index - 1);
      return copy;
    });
  }

  function handleMoveRight(goal: Goal) {
    setGoals((prev) => {
      const copy = [...prev];
      const index = copy.findIndex((g) => g.id === goal.id);
      if (index === -1 || index === prev.length - 1) {
        return prev;
      }
      swap(copy, index, index + 1);
      return copy;
    });
  }

  return (
    <>
      <Title mb={30} order={2}>
        Weekly goals {allGoalsComplete && "complete 🎊"}
      </Title>
      <Group spacing="xl" mb={30}>
        {goals.map((goal, i) => {
          const moveLeftDisabled = i === 0;
          const moveRightDisabled = i === goals.length - 1;
          return (
            <div key={goal.id}>
              <GoalMenu
                goal={goal}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onMoveLeft={handleMoveLeft}
                onMoveRight={handleMoveRight}
                moveLeftDisabled={moveLeftDisabled}
                moveRightDisabled={moveRightDisabled}
              />
              <GoalBoxes
                goal={goal}
                onTimesCompletedChanged={handleOnTimesCompletedChanged}
              />
            </div>
          );
        })}
      </Group>
      <Button
        onClick={() => setIsGoalModalVisible(true)}
        leftIcon={<IconPlus size={14} />}
      >
        Create new goal
      </Button>
      {isGoalModalVisible && (
        <GoalModal
          onClose={handleCloseModal}
          onSaveNew={handleSaveNew}
          onSaveExisting={handleSaveExisting}
          goal={selectedGoal}
        />
      )}
    </>
  );
}
