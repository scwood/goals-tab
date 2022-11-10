import { Button } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

import styles from "./WeeklyGoals.module.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Goal } from "./Goal";
import { GoalModal } from "./GoalModal";
import { GoalBoxes } from "./GoalBoxes";

export function WeeklyGoals() {
  const [goals, setGoals] = useLocalStorage<Goal[]>("goals", []);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const allGoalsComplete = goals.every(
    (goal) => goal.timesCompleted === goal.timesPlanned
  );

  function handleSave(title: string, timesPlanned: number) {
    setGoals((prev) => [
      ...prev,
      { id: uuidV4(), title, timesPlanned, timesCompleted: 0 },
    ]);
    handleClose();
  }

  function handleClose() {
    setIsGoalModalVisible(false);
  }

  function handleDelete() {
    handleClose();
  }

  function handleGoalClick() {
    // Todo
  }

  /** This is way too complicated lol */
  const handleTimesCompletedChanged =
    (goal: Goal) => (timesCompleted: number) => {
      setGoals((prev) => {
        return prev.map((prevGoal) => {
          return {
            ...prevGoal,
            timesCompleted:
              goal.id === prevGoal.id
                ? timesCompleted
                : prevGoal.timesCompleted,
          };
        });
      });
    };

  return (
    <>
      <h5 className={styles.header}>
        Weekly goals {allGoalsComplete && "complete 🎊"}
      </h5>
      <div className={styles.goalBoxesContainer}>
        {goals.map((goal) => {
          return (
            <GoalBoxes
              key={goal.id}
              goal={goal}
              onTimesCompletedChanged={handleTimesCompletedChanged(goal)}
              onClick={handleGoalClick}
            />
          );
        })}
      </div>
      <div>
        <Button
          variant="light"
          size="sm"
          onClick={() => setIsGoalModalVisible(true)}
        >
          + Create new goal
        </Button>
      </div>
      {isGoalModalVisible && (
        <GoalModal
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
