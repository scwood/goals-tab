import {
  SegmentedControl,
  useMantineColorScheme,
  ColorScheme,
  Center,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons";
import { ReactNode } from "react";

export function ColorSchemeToggle() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  const data: { value: ColorScheme; label: ReactNode }[] = [
    {
      value: "light",
      label: (
        <Center>
          <IconSun size={20} />
        </Center>
      ),
    },
    {
      value: "dark",
      label: (
        <Center>
          <IconMoon size={20} />
        </Center>
      ),
    },
  ];

  return (
    <SegmentedControl
      onChange={(value: ColorScheme) => toggleColorScheme(value)}
      value={colorScheme}
      data={data}
      style={{ position: "absolute", top: 10, right: 10 }}
    />
  );
}
