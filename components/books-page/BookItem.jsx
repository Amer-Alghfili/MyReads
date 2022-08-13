import BookContainer from "./BookContainer";
import BookImage from "./BookImage";
import BookInfo from "./BookInfo";

export default function Book({ id, title, authors, img, tags, rating }) {
  return (
    <BookContainer bookId={id}>
      <BookImage title={title} img={img} />
      <BookInfo title={title} tags={tags} authors={authors} rating={rating} />
    </BookContainer>
  );
}
