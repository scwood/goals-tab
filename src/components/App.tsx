import styles from "./App.module.css";
import { CurrentDateTime } from "./CurrentDateTime";
import { SearchBar } from "./SearchBar";
import { WeeklyGoals } from "./WeeklyGoals";

function App() {
  return (
    <div className={styles.container}>
      <CurrentDateTime />
      <SearchBar />
      <WeeklyGoals />
    </div>
  );
}

export default App;
