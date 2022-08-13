import { chakra, useToast } from "@chakra-ui/react";
import React from "react";
import Feedback from "../components/Feedback";
import { getAll, update } from "../services/bookAPI";
import {
  changeBookShelf,
  filterBooksByShelf,
  getBookToUpdate,
  reorderShelfBooks,
} from "../util";

export default function useShelves(books) {
  const toast = useToast();
  const [booksShelves, setBooksShelves] = React.useState(() => {
    return {
      currentlyReading: filterBooksByShelf(books, "currentlyReading"),
      read: filterBooksByShelf(books, "read"),
      wantToRead: filterBooksByShelf(books, "wantToRead"),
    };
  });

  async function addBookToShelves(book, { shelfCode, shelfTitle }) {
    try {
      await update(book, shelfCode);
      const updatedBooks = await getAll();
      setBooksShelves({
        wantToRead: filterBooksByShelf(updatedBooks, "wantToRead"),
        read: filterBooksByShelf(updatedBooks, "read"),
        currentlyReading: filterBooksByShelf(updatedBooks, "currentlyReading"),
      });
      toast({
        render: (props) => (
          <Feedback
            {...props}
            title="Book added successfully"
            message={
              <>
                {book.title} has been added to
                {
                  <chakra.span fontStyle="italic"> {shelfTitle} </chakra.span>
                }{" "}
                shelf successfully
              </>
            }
          />
        ),
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        render: (props) => (
          <Feedback
            {...props}
            variant="fail"
            title="Book added successfully"
            message={
              <>
                Couldn&apos;t add {book.title} to
                <chakra.span fontStyle="italic">
                  {" "}
                  {shelfTitle}{" "}
                </chakra.span>{" "}
                shelf
              </>
            }
          />
        ),
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  async function updateBookShelves(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    const bookDraggedToSamePosition =
      destination.droppableId == source.draggableId &&
      destination.index == source.index;

    if (bookDraggedToSamePosition) {
      return;
    }

    const movedWithinSameShelf = destination.droppableId == source.droppableId;

    if (movedWithinSameShelf) {
      const newShelves = reorderShelfBooks(booksShelves, result);
      setBooksShelves(newShelves);
    } else {
      const book = getBookToUpdate(booksShelves, result);
      const tempShelves = { ...booksShelves };
      const newShelves = changeBookShelf(booksShelves, result);
      setBooksShelves(newShelves);
      try {
        await update(book, destination.droppableId);
        toast({
          render: (props) => (
            <Feedback
              {...props}
              title="Book's shelf updated successfully"
              description={
                <>
                  {book.title}&apos;s shelf has been changed from
                  {
                    <chakra.span fontStyle="italic">
                      {" "}
                      {source.droppableId}{" "}
                    </chakra.span>
                  }
                  to
                  {
                    <chakra.span fontStyle="italic">
                      {" "}
                      {destination.droppableId}{" "}
                    </chakra.span>
                  }
                  shelf successfully
                </>
              }
            />
          ),
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } catch (err) {
        setBooksShelves(tempShelves);
        toast({
          render: (props) => (
            <Feedback
              {...props}
              variant="fail"
              title="Failed to update book's shelf"
              description={
                <>
                  Couldn&apos;t add book.title to
                  <chakra.span fontStyle="italic">
                    {" "}
                    {destination.droppableId}
                  </chakra.span>{" "}
                  shelf
                </>
              }
            />
          ),
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  }

  return {
    booksShelves,
    updateBookShelves,
    addBookToShelves,
  };
}
