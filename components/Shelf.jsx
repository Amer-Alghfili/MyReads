import React from "react";
import Link from "next/link";
import InlineSearch from "../components/InlineSearch";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ImBook } from "react-icons/im";

export default function Shelf({ name, title, books, onOpenInlineSearch }) {
  // "before:top-0 before:left-0 right-0"
  const bookStyles =
    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-6 after:border-t-xl after:border-gray-500 after:bg-gray-400 after:box-content after:-z-10";
  return (
    <section className={`shelf relative mb-12 ${bookStyles}`}>
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <button
          className="flex items-center p-4 rounded-lg text-sm text-green-50 bg-emerald-700"
          onClick={() => onOpenInlineSearch(name)}
        >
          New Book <ImBook className="ml-3" />
        </button>
      </div>
      <Droppable droppableId={name} direction="horizontal">
        {(provided) => (
          <ul
            className="flex overflow-x-auto overflow-y-visible h-80 items-end"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {books.length ? (
              books?.map(
                (
                  { id, title, subtitle, authors, categories, imageLinks },
                  index
                ) => {
                  const thumbnail = imageLinks?.thumbnail;
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          className="shrink-0"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          tabIndex={-1}
                        >
                          <Link href={`/books/${id}`}>
                            <a className="book block h-60 mb-12 mx-8 z-10 relative after:absolute after:-right-5 after:bottom-px after:bg-gray-200 after:w-6 after:border-r after:border-r-gray-400 after:-z-10 after:top-1">
                              <div className="h-full">
                                <img
                                  className="h-full rounded-sm"
                                  src={thumbnail}
                                  alt="book"
                                />
                              </div>
                            </a>
                          </Link>
                        </li>
                      )}
                    </Draggable>
                  );
                }
              )
            ) : (
              <div>No book on this shelf</div>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </section>
  );
}
