import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import styles from "./SearchBar.module.css";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const params = new URLSearchParams();
  params.set("q", searchQuery);
  const googleUrl = `https://google.com/search?${params.toString()}`;

  return (
    <InputGroup className={styles.searchBar}>
      <Form.Control
        placeholder="Search google"
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            window.location.href = googleUrl;
          }
        }}
        value={searchQuery}
      />
    </InputGroup>
  );
}
