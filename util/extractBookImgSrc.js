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
