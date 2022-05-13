import React from "react";
import Link from "next/link";
import { useBookSearch } from "../hooks/useBookSearch";
import Rating from "@mui/material/Rating";
import Search from "./Search";

export default function InlineSearch({ onBookClick }) {
  const [query, setQuery] = React.useState("");

  const books = useBookSearch(query);

  const searchItemsComponent = books.map((book) => {
    const { id, title, subtitle, description, imageLinks, averageRating } =
      book;
    const thumbnail = imageLinks?.thumbnail;
    return (
      <li
        key={id}
        className="cursor-pointer bg-emerald-800 hover:bg-emerald-900 text-green-100 transition duration-300 ease-in-out"
        onClick={() => onBookClick(book)}
      >
        <div className="flex items-center my-4">
          <div className="">
            <img src={thumbnail} alt="book" />
          </div>
          <div className="w-full ml-8 flex flex-col overflow-hidden py-2">
            <span className="font-bold text-lg mb-2">{title}</span>
            <span className="font-semibold mb-2">{subtitle}</span>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap mb-2">
              {description}
            </p>
            <Rating readOnly name="read-only" value={averageRating} />
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
      <Search
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>{searchItemsComponent}</ul>
    </div>
  );
}
