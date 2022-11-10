import { useState, useEffect } from "react";

import styles from "./CurrentDateTime.module.css";

export function CurrentDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <h1>{now.toLocaleTimeString(undefined, { timeStyle: "short" })}</h1>
      <h5>{now.toLocaleDateString(undefined, { dateStyle: "long" })}</h5>
    </div>
  );
}
