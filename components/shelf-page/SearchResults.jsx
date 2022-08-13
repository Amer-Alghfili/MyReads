import { VStack } from "@chakra-ui/react";
import SearchBookItem from "./SearchBookItem";

export default function SearchResults({ books, onAddBook }) {
  return (
    <VStack
      wrap="wrap"
      align="stretch"
      justify="center"
      alignContent={{
        base: "flex-start !important",
        "2xl": "center !important",
      }}
      spacing={0}
      m="auto !important"
      me="-3em"
    >
      {books?.map((book, index) => {
        return (
          <SearchBookItem
            key={book.id}
            book={book}
            isLastItem={index == books.length - 1}
            onAdd={onAddBook}
          />
        );
      })}
    </VStack>
  );
}
