import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useState } from "react";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const params = new URLSearchParams();
  params.set("q", searchQuery);
  const googleUrl = `https://google.com/search?${params.toString()}`;

  return (
    <TextInput
      mb={50}
      style={{ width: 500 }}
      icon={<IconSearch size={14} />}
      placeholder="Search google"
      onChange={(event) => setSearchQuery(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          window.location.href = googleUrl;
        }
      }}
      value={searchQuery}
    />
  );
}
