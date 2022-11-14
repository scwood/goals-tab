import { Dispatch, SetStateAction, useCallback } from "react";
import { v4 as uuidV4 } from "uuid";

import { Goal } from "../components/Goal";
import { useLocalStorage } from "./useLocalStorage";

export interface UseWeeklyGoalsResult {
  goals: Goal[];
  createGoal: (name: string, timesPlanned: number) => void;
  updateGoal: (
    id: string,
    name: string,
    timesPlanned: number,
    timesCompleted: number
  ) => void;
  deleteGoal: (id: string) => void;
  setGoals: Dispatch<SetStateAction<Goal[]>>;
}

export function useWeeklyGoals(): UseWeeklyGoalsResult {
  const [goals, setGoals] = useLocalStorage<Goal[]>({
    key: "goals",
    defaultValue: [],
  });

  const createGoal = useCallback(
    (name: string, timesPlanned: number) => {
      setGoals((prev) => [
        ...prev,
        { id: uuidV4(), name, timesPlanned, timesCompleted: 0 },
      ]);
    },
    [setGoals]
  );

  const updateGoal = useCallback(
    (
      id: string,
      name: string,
      timesPlanned: number,
      timesCompleted: number
    ) => {
      setGoals((prev) => {
        return prev.map((goal) => {
          if (goal.id === id) {
            return { id, name, timesPlanned, timesCompleted };
          } else {
            return goal;
          }
        });
      });
    },
    [setGoals]
  );

  const deleteGoal = useCallback(
    (id: string) => {
      setGoals((prev) => {
        return prev.filter((goal) => goal.id !== id);
      });
    },
    [setGoals]
  );

  return { goals, createGoal, updateGoal, deleteGoal, setGoals };
}
