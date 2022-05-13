import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/Link";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/router";
import { get, update } from "../../services/bookAPI";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import reviewJSON from "../../data/reviews.json";
import ShelvesOptions from "../../components/ShelvesOptions";

export default function Books() {
  const [book, setBook] = useState({});
  const [ratingInput, setRatingInput] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [newShelf, setNewShelf] = useState();

  const reviewFormRef = useRef(null);

  const { query } = useRouter();
  const { id } = query;

  function getBookAfterNewRate(book, newRate) {
    const { ratingsCount, averageRating } = book;
    const newRaters = ratingsCount / averageRating + 1;
    const newRatingsCount = ratingsCount + newRate;
    const newAverageRating = newRatingsCount / newRaters;
    return { ...book, averageRating: newAverageRating };
  }

  function submitReview(e) {
    e.preventDefault();
    // reviewFormRef.reset();

    // Pulling out review details
    const subject = e.target["subjectInput"].value;
    const description = e.target["descriptionInput"].value;
    // const rate = e.target["rateInput"].value;

    // Format review
    const newReview = {
      subject,
      description,
      rate: ratingInput,
      user: "Anonymous",
      date: "08-05-2022",
    };

    // Pushing review to reviews list
    const newReviewList = [...reviews];
    newReviewList.push(newReview);
    setReviews(newReviewList);

    // Update book with new rate
    setBook(getBookAfterNewRate(book, ratingInput));

    // Reset form
    e.target.reset();
    setRatingInput(0);
  }

  useEffect(
    function changeShelfEffect() {
      async function changeShelf() {
        let oldBook;
        try {
          oldBook = { ...book };
          setBook({ ...book, shelf: newShelf });
          await update(book, newShelf);
        } catch (e) {
          setBook(oldBook);
        }
      }
      changeShelf();
    },
    [newShelf]
  );

  useEffect(
    function fetchBookEffect() {
      async function fetchBook() {
        try {
          const book = await get(id);
          setBook(book);
          setReviews(reviewJSON);
          setNewShelf(book.shelf);
        } catch (e) {}
      }
      fetchBook();
    },
    [id]
  );

  const renderedReviews = reviews?.map((review) => {
    const { user, img, subject, description, date, rate } = review;
    return (
      <article key={`${review} ${date}`}>
        <div className="border my-12 p-6 rounded-md">
          <div className="flex items-center mb-2">
            <Avatar />
            <div className="mx-3">{user}</div>
          </div>
          <Rating readOnly name="read-only" value={rate} />
          <h3 className="mt-4 mb-2 text-2xl font-medium">{subject}</h3>
          <p className="mb-3">{description}</p>
          <div className="text-sm text-slate-500">{date}</div>
        </div>
      </article>
    );
  });

  const {
    title,
    subtitle,
    imageLinks,
    authors,
    averageRating,
    categories,
    description,
    previewLink,
    shelf,
  } = book;

  const { thumbnail } = imageLinks ? imageLinks : "";

  const auth = authors?.join(", ");

  if (!book.id) {
    return <div>No result</div>;
  }

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
      <main className="p-8">
        <section>
          <div className="flex">
            <div className="w-1/4">
              <img
                className="w-full"
                src={thumbnail}
                alt={`${title ? title : ""} book`}
              />
            </div>
            <div className="mx-8">
              <h1 className="my-3 text-5xl">{title}</h1>
              <h2 className="my-3 mb-0 text-3xl">{subtitle}</h2>
              <div className="my-1 text-sm text-slate-500">{auth}</div>
              <Rating readOnly name="read-only" value={averageRating} />
              <div className="my-2 flex flex-wrap">
                {categories?.map((category) => {
                  return (
                    <div
                      className="bg-blue-800 text-xs font-light rounded-2xl px-2 py-1 text-zinc-300"
                      key={category}
                    >
                      {category}
                    </div>
                  );
                })}
              </div>
              <div className="my-8">
                <button
                  className="bg-green-600 text-slate-100 px-2 py-3 rounded-md"
                  onClick={() => setShowOptions(true)}
                >
                  {shelf ? "Change Shelf" : "Add To Shelf"}
                </button>
                <a
                  href={previewLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 text-sm underline mx-4"
                >
                  or visit book page
                </a>
              </div>
            </div>
          </div>
        </section>
        <ShelvesOptions
          shelf={newShelf}
          open={showOptions}
          onClose={(newShelf) => {
            setNewShelf(newShelf);
            setShowOptions(false);
          }}
        />
        <section>
          <article>
            <div className="mt-24">
              <h2 className="text-5xl mb-6">Description</h2>
              <p className="text-xl">{description}</p>
            </div>
          </article>
        </section>
        <section>
          <div className="my-16">
            <h2 className="text-5xl">Reviews</h2>
            <form
              ref={reviewFormRef}
              onSubmit={submitReview}
              className="my-10 border p-6 rounded-xl"
            >
              <InputLabel className="!text-slate-900" htmlFor="rate-input">
                Rate
              </InputLabel>
              <Rating
                id="rate-input"
                value={ratingInput}
                onChange={(e, value) => setRatingInput(value)}
                name="rateInput"
                className="mb-8"
                size="large"
                autocomplete="off"
              />
              <div className="mb-10">
                <InputLabel className="!text-slate-900" htmlFor="subject-input">
                  Subject
                </InputLabel>
                <Input
                  id="subject-input"
                  name="subjectInput"
                  className="w-full"
                />
              </div>
              <div>
                <InputLabel
                  className="!text-slate-900"
                  htmlFor="description-input"
                >
                  Review
                </InputLabel>
                <Input
                  id="description-input"
                  name="descriptionInput"
                  className="w-full"
                />
              </div>
              <button
                // type="submit"
                className="bg-green-600 text-slate-100 px-6 py-2 rounded-md mt-12"
              >
                Submit
              </button>
            </form>
            <div>{renderedReviews}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
