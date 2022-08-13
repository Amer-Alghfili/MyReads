import { Droppable } from "react-beautiful-dnd";
import { extractBookImgSrc } from "../../util/";
import EmptyShelf from "./EmptyShelf";
import ShelfBook from "./ShelfBook";

export default function ShelfBooks({ books, code, onModalOpen }) {
  let renderedContent;

  if (books.length) {
    renderedContent = books.map(({ id, imageLinks }, index) => {
      const img = extractBookImgSrc(imageLinks);
      return <ShelfBook key={id} id={id} img={img} index={index} />;
    });
  } else {
    renderedContent = <EmptyShelf openModal={onModalOpen} />;
  }

  return (
    <Droppable droppableId={code} direction="horizontal" type="SHELF">
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              overflow: "auto",
              margin: books.length ? 0 : "0 auto",
              display: "flex",
              position: "relative",
              zIndex: 3,
            }}
          >
            {renderedContent}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}
