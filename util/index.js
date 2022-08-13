export function filterBooksByShelf(books, shelf) {
  return books.filter((book) => book.shelf == shelf);
}

export function extractBookImgSrc(imageLinks) {
  if (imageLinks) {
    const { thumbnail, smallThumbnail } = imageLinks;
    let bookImg;

    if (thumbnail) {
      bookImg = thumbnail;
    } else {
      bookImg = smallThumbnail;
    }
    return bookImg;
  }
}

export function reorderShelfBooks(booksShelves, { source, destination }) {
  const shelf = booksShelves[source.droppableId];
  const updatedShelf = [...shelf];
  const [book] = updatedShelf.splice(source.index, 1);
  updatedShelf.splice(destination.index, 0, book);
  return {
    ...booksShelves,
    [source.droppableId]: updatedShelf,
  };
}

export function changeBookShelf(booksShelves, result) {
  const { destination, source, draggableId } = result;
  const sourceShelfBooks = [...booksShelves[source.droppableId]];
  const [book] = sourceShelfBooks.splice(source.index, 1);
  const destinationShelfBooks = [...booksShelves[destination.droppableId]];
  destinationShelfBooks.splice(destination.index, 0, book);
  return {
    ...booksShelves,
    [source.droppableId]: sourceShelfBooks,
    [destination.droppableId]: destinationShelfBooks,
  };
}

export function getBookToUpdate(booksShelves, { source }) {
  return { ...booksShelves[source.droppableId][source.index] };
}
