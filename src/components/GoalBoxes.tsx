import styles from "./GoalBoxes.module.css";
import { Goal } from "./Goal";

export interface GoalBoxesProps {
  goal: Goal;
  onTimesCompletedChanged: (timesCompleted: number) => void;
  onClick: () => void;
}

export function GoalBoxes(props: GoalBoxesProps) {
  const { goal, onTimesCompletedChanged } = props;

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>{goal.title}</h6>
      <div className={styles.boxesContainer}>
        {Array.from({ length: goal.timesPlanned }).map((_, i) => {
          const completed = i < goal.timesCompleted;
          return (
            <button
              onClick={() =>
                onTimesCompletedChanged(
                  completed ? goal.timesCompleted - 1 : goal.timesCompleted + 1
                )
              }
              className={`${styles.box} ${
                completed ? styles.complete : styles.incomplete
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
