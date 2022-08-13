import { chakra } from "@chakra-ui/react";
import React from "react";
import useInlineSearchBooks from "../../hooks/manageInlineSearchBooks";
import ModalContent from "../ModalContent";
import SearchInput from "../SearchInput";
import EmptySearchResult from "./EmptySearchResult";
import SearchResults from "./SearchResults";

export default function SearchModal({
  shelfTitle,
  shelfCode,
  isOpen,
  onAddBook,
}) {
  const { books, setAddedBookId, query, setQuery } = useInlineSearchBooks({
    shelfCode,
    isOpen,
    setAddedBookId,
  });

  async function handleAddition(book) {
    try {
      await onAddBook(book);
      setAddedBookId(book.id);
    } catch (err) {
      setAddedBookId("");
    }
  }

  return (
    <ModalContent
      title={
        <>
          Add book to
          <chakra.span fontStyle="italic">{` ${shelfTitle} `}</chakra.span>
          shelf
        </>
      }
    >
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        maxW="50.61em"
        m="auto"
        mb="3em"
      />
      {books.length ? (
        <SearchResults books={books} onAddBook={handleAddition} />
      ) : (
        <EmptySearchResult />
      )}
    </ModalContent>
  );
}
