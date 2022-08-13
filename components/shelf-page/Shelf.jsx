import { chakra } from "@chakra-ui/react";
import React from "react";
import ShelfBooksContainer from "./ShelfBooksContainer";

export default function Shelf({ ShelfHeader, ShelfBooks }) {
  return (
    <chakra.section>
      {ShelfHeader}
      <ShelfBooksContainer>{ShelfBooks}</ShelfBooksContainer>
    </chakra.section>
  );
}
