import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";

import styles from "./App.module.css";
import { CurrentDateTime } from "./CurrentDateTime";
import { SearchBar } from "./SearchBar";
import { WeeklyGoals } from "./WeeklyGoals";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ColorSchemeToggle } from "./ColorSchemeToggle";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "colorScheme",
    defaultValue: "dark",
  });

  function toggleColorScheme(newColorScheme?: ColorScheme) {
    setColorScheme((prev) => {
      return newColorScheme || (prev === "light" ? "dark" : "light");
    });
  }

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          headings: { fontWeight: 600 },
          globalStyles: (theme) => {
            return {
              body: {
                ...theme.fn.fontStyles(),
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.white,
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
              },
            };
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <div className={styles.container}>
          <ColorSchemeToggle />
          <CurrentDateTime />
          <SearchBar />
          <WeeklyGoals />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
