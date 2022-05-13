import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAll, update } from "../services/bookAPI";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
import Shelf from "../components/Shelf";
import Dialog from "../components/Dialog";
import InlineSearch from "../components/InlineSearch";

const SHELVES_LIST = [
  { name: "read", title: "Read" },
  { name: "wantToRead", title: "Want To Read" },
  { name: "currentlyReading", title: "Reading" },
];

function getShelfTitle(shelf) {
  if (!shelf) {
    return;
  }
  const { title } = SHELVES_LIST.find(({ name }) => name === shelf);
  if (title) {
    return title;
  } else {
    console.log("Couldn't find shelf");
    return;
  }
}

export default function Shelves() {
  const [shelves, setShelves] = React.useState({
    wantToRead: [],
    read: [],
    currentlyReading: [],
  });
  const [tempShelves, setTempShelves] = React.useState({ ...shelves });
  const [shelfUpdatedBook, setShelfUpdatedBook] = React.useState();
  const [openSearch, setOpenSearch] = React.useState(false);
  const [shelfForNewBook, setShelfForNewBook] = React.useState();

  function openInlineSearch(shelf) {
    setOpenSearch(true);
    setShelfForNewBook(shelf);
  }

  function onDragEnd({ source, destination }) {
    if (!destination || !source) {
      return;
    }

    const newShelves = { ...shelves };
    const tempShelves = { ...shelves };

    if (source.droppableId === destination.droppableId) {
      // Change one shelf with that id only
      // Index of the shelf in newShelves can be pulled out from source or destination
      const newShelf = [...newShelves[source.droppableId]];
      const [removed] = newShelf.splice(source.index, 1);
      newShelf.splice(destination.index, 0, removed);
      newShelves[source.droppableId] = newShelf;
    } else {
      function removeFromList(list, index) {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
      }

      function addToList(list, index, element) {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
      }

      const sourceShelf = [...newShelves[source.droppableId]];
      const [removedElement, newSourceShelf] = removeFromList(
        sourceShelf,
        source.index
      );
      const bookToBeUpdated = { ...removedElement };
      bookToBeUpdated.shelf = destination.droppableId;
      newShelves[source.droppableId] = newSourceShelf;
      const destinationShelf = [...newShelves[destination.droppableId]];
      newShelves[destination.droppableId] = addToList(
        destinationShelf,
        destination.index,
        bookToBeUpdated
      );
      setShelfUpdatedBook(bookToBeUpdated);
    }
    setShelves(newShelves);
    setTempShelves(tempShelves);
  }

  function changeBookShelf(book, newShelf) {
    const sourceShelfName = book.shelf;
    const newShelves = { ...shelves };
    const tempShelves = { ...shelves };
    const sourceShelf = newShelves[sourceShelfName].filter(
      ({ id }) => id !== book.id
    );
    const destinationShelf = [...newShelves[newShelf]];

    book.shelf = newShelf;
    destinationShelf.push(book);
    newShelves[sourceShelfName] = sourceShelf;
    newShelves[newShelf] = destinationShelf;
    setShelfUpdatedBook(book);
    setShelves(newShelves);
    setTempShelves(tempShelves);
    setOpenSearch(false);
  }

  function addBookToShelf(book) {
    let currentBook;
    const copyBook = { ...book };
    for (const key of Object.keys(shelves)) {
      currentBook = shelves[key].find(({ id }) => id === book.id);
      if (currentBook) {
        if (currentBook.shelf === shelfForNewBook) {
          console.log("This book already exist");
          return;
        }
        // If we found a book but it's in different shelf
        // We'll change the existing book's shelf
        return changeBookShelf(copyBook, shelfForNewBook);
      }
    }
    const newShelves = { ...shelves };
    const tempShelves = { ...shelves };
    const newShelf = [...newShelves[shelfForNewBook]];
    copyBook.shelf = shelfForNewBook;
    newShelf.push(copyBook);
    newShelves[shelfForNewBook] = newShelf;
    setShelves(newShelves);
    setTempShelves(tempShelves);
    setShelfUpdatedBook(copyBook);
    setOpenSearch(false);
  }

  React.useEffect(function fetchBooksEffect() {
    async function fetchBooks() {
      const books = await getAll();
      const readingBooks = books.filter(
        ({ shelf }) => shelf === "currentlyReading"
      );
      const readBooks = books.filter(({ shelf }) => shelf === "read");
      const wantReadBooks = books.filter(({ shelf }) => shelf === "wantToRead");

      setShelves({
        read: readBooks,
        currentlyReading: readingBooks,
        wantToRead: wantReadBooks,
      });
    }
    fetchBooks();
  }, []);

  React.useEffect(
    function updateBookShelfEffect() {
      async function updateBookShelf() {
        try {
          await update(shelfUpdatedBook, shelfUpdatedBook.shelf);
          setTempShelves(shelves);
        } catch (err) {
          setShelves(tempShelves);
        }
      }
      if (shelfUpdatedBook) updateBookShelf();
    },
    [shelfUpdatedBook]
  );

  return (
    <div>
      <Head>
        <title>MyReads</title>
        <meta
          name="description"
          content="Manage and track your books with MyReads!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="mb-8">
          <DragDropContext onDragEnd={onDragEnd}>
            {SHELVES_LIST.map(({ name, title }) => (
              <Shelf
                key={name}
                name={name}
                title={title}
                books={shelves[name]}
                onAddBookToShelf={addBookToShelf}
                onOpenInlineSearch={openInlineSearch}
              />
            ))}
          </DragDropContext>
        </div>
      </main>
      <Footer />
      <Dialog
        fullWidth
        maxWidth="100%"
        title={`Add new book to your "${getShelfTitle(shelfForNewBook)}" shelf`}
        open={openSearch}
        onClose={() => setOpenSearch(false)}
      >
        <InlineSearch onBookClick={addBookToShelf} />
      </Dialog>
    </div>
  );
}

export async function getServerSideProps() {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  return { props: { data: [] } };
}
