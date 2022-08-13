import { Box, Grid, VStack } from "@chakra-ui/react";
import React from "react";
import BookImage from "./book-page/BookImage";
import BookRating from "./book-page/BookRating";
import BookTags from "./book-page/BookTags";
import BookTitle from "./book-page/BookTitle";
import BookAdditionalInfo from "./books-page/BookAdditionalInfo";

export default function BookInfo({ onShelfChange, book, BookActions }) {
  const {
    title,
    subtitle,
    authors,
    categories,
    averageRating,
    imageLinks,
    pageCount,
    publishedDate,
    publisher,
    ratingsCount,
  } = book;

  return (
    <>
      <Grid
        gridTemplateColumns="28em 0.1em 1fr"
        gridColumnGap={{ base: "0", md: "2em" }}
        gridRowGap={{ base: "2em" }}
        justifyContent="center"
      >
        <Box gridColumn={{ base: "1 / -1", md: "1 / 2" }}>
          <BookTitle title={title} subtitle={subtitle} />
        </Box>
        <Box gridColumn={{ base: "1 / -1", md: "1 / 2" }}>
          <BookImage title={title} imageLinks={imageLinks} />
        </Box>
        <Box
          display={{ base: "none", md: "block" }}
          gridColumn="2 / 3"
          gridRow="1 / 3"
          bgColor="#AEAEAE"
          borderRadius="1em"
        />
        <VStack
          gridColumn={{ base: "1 / -1", md: "3 / -1" }}
          gridRow={{ base: "2 / 3", md: "1 / 2" }}
          align="flex-start"
          justify="flex-start !important"
        >
          <BookRating
            averageRating={averageRating}
            ratingsCount={ratingsCount}
          />
          <BookTags tags={categories} />
        </VStack>
        <Box gridColumn={{ base: "1 / -1", md: "3 / -1" }}>
          <BookAdditionalInfo
            publisher={publisher}
            authors={authors}
            publishedDate={publishedDate}
            pageCount={pageCount}
          />
          {BookActions}
        </Box>
      </Grid>
    </>
  );
}
