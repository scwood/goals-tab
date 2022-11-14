import { Stack, Title } from "@mantine/core";
import { useState, useEffect } from "react";

export function CurrentDateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Stack spacing={0} align="center" mb={24}>
      <Title order={1}>
        {now.toLocaleTimeString(undefined, { timeStyle: "short" })}
      </Title>
      <Title order={5}>
        {now.toLocaleDateString(undefined, { dateStyle: "long" })}
      </Title>
    </Stack>
  );
}
