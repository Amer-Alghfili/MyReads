import React from "react";
import { getAll, search } from "../services/bookAPI";

export default function useInlineSearchBooks({ shelfCode, isOpen }) {
  const [query, setQuery] = React.useState("");
  const [addedBookId, setAddedBookId] = React.useState("");
  const [searchBooks, setSearchBooks] = React.useState([]);

  React.useEffect(
    function afterAddingBookEffect() {
      if (addedBookId) {
        const newSearchBooks = searchBooks.filter(
          ({ id }) => id != addedBookId
        );
        setSearchBooks(newSearchBooks);
        setAddedBookId("");
      }
    },
    [addedBookId]
  );

  React.useEffect(
    function modalSearchEffect() {
      async function handleModalSearch() {
        const searchBooks = await search(query);
        if (!searchBooks.length) {
          return setSearchBooks([]);
        }
        const excludedBooks = await getAll();
        const excludedBooksIds = excludedBooks
          .filter((book) => book.shelf == shelfCode)
          .map(({ id }) => id);
        const filerShelfBooks = searchBooks.filter(
          ({ id }) => !excludedBooksIds.includes(id)
        );
        setSearchBooks(filerShelfBooks);
      }
      if (query && isOpen) {
        handleModalSearch();
      } else {
        setQuery("");
        setSearchBooks([]);
      }
    },
    [query, isOpen]
  );

  return {
    books: searchBooks,
    setAddedBookId,
    query,
    setQuery,
  };
}
