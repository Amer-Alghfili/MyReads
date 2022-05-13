import React from "react";
import { getAll, search } from "../services/bookAPI";

export function useBookSearch(query) {
  const [books, setBooks] = React.useState([]);

  React.useEffect(
    function searchBooksEffect() {
      async function searchBooks() {
        let books = [];
        if (query === "") {
          books = await getAll();
        } else {
          books = await search(query);
          if (!books?.length) {
            books = await getAll();
          }
        }
        setBooks(books);
      }
      searchBooks();
    },
    [query]
  );

  return books;
}
