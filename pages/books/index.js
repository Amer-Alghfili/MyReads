import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/Link";
import { search, getAll } from "../../services/bookAPI";
import Rating from "@mui/material/Rating";
import { useHighestHeight } from "../../hooks/useHighestHeight";
import { useBookSearch } from "../../hooks/useBookSearch";
import Search from "../../components/Search";

export default function Books() {
  const [query, setQuery] = React.useState();
  const ref = React.useRef(null);

  const books = useBookSearch(query);

  const itemHeight = useHighestHeight(ref);

  const booksComponent = books.map((book) => {
    const { id, title, authors, averageRating, imageLinks } = book;
    const { thumbnail } = imageLinks;
    const auth = authors?.join(", ");
    let renderedCategories;
    // book.categories && book.categories.push("test");
    if (book.categories && book.categories.length) {
      renderedCategories = (
        <div className="rating-container flex flex-wrap mx-4">
          {book.categories.map((category) => {
            return (
              <div
                className="m-px bg-blue-800 text-xs font-light rounded-2xl px-2 py-1 text-zinc-300 overflow-hidden text-ellipsis whitespace-nowrap"
                key={category}
              >
                {category}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <li key={id} className="m-4" style={{ height: itemHeight }}>
        <Link href={`/books/${id}`}>
          <a className="flex flex-col w-52 h-full rounded-xl shadow-2xl">
            <div className="w-full h-32 overflow-hidden rounded-t-lg">
              <img className="w-full" src={thumbnail} alt="book" />
            </div>
            <div className="p-3 grow flex flex-col justify-between">
              <h2 className="font-bold text-md overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </h2>
              <div className="my-2 text-xs text-slate-500">{auth}</div>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center">
                  <Rating
                    className="w-6"
                    name="read-only"
                    // defaultValue={1}
                    value={averageRating}
                    readOnly
                    max={1}
                    size="small"
                  />
                  <div className="text-sm">
                    {averageRating ? averageRating : 0}
                  </div>
                </div>
                {renderedCategories}
              </div>
            </div>
          </a>
        </Link>
      </li>
    );
  });

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
        <section>
          <div className="bg-green-500/70 p-4">
            <h1 className="text-4xl font-semibold">Explore books</h1>
            <h2 className="text-2xl font-normal mt-2 mb-6">
              Search for a book and add it to your shelves
            </h2>
            <Search
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </section>
        <section>
          <div>
            <ul ref={ref} className="flex flex-wrap">
              {booksComponent}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
