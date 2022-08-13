import { HStack } from "@chakra-ui/react";
import { extractBookImgSrc } from "../../util";
import Book from "./BookItem";

export default function BookList({ books }) {
  let renderedBooks;
  if (books.length > 0) {
    renderedBooks = books?.map((book) => {
      const img = extractBookImgSrc(book.imageLinks);
      return (
        <Book
          key={book.id}
          id={book.id}
          title={book.title}
          authors={book.authors}
          img={img}
          tags={book.categories}
          rating={book.averageRating}
        />
      );
    });
  }

  return (
    <HStack wrap="wrap" align="stretch" justify="center" me="-3em !important">
      {renderedBooks}
    </HStack>
  );
}
