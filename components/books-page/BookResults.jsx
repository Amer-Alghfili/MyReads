import { Heading } from "@chakra-ui/react";
import BookList from "./BookList";

export default function BookRsults({ books }) {
  return (
    <div className="double-container">
      <Heading as="h3" textAlign="center" fontSize="2em" m="4em 0 3em">
        Results
      </Heading>
      <BookList books={books} />
    </div>
  );
}
