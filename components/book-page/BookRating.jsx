import { StarIcon } from "@chakra-ui/icons";
import { chakra, HStack } from "@chakra-ui/react";

export default function BookRating({ ratingsCount, averageRating }) {
  const renderedRating = [];
  for (let i = 0; i < averageRating; i++) {
    renderedRating.push(<StarIcon key={i} color="#dbdb42" />);
  }

  return (
    <HStack mb={{ base: 0, md: "1em !important" }}>
      {renderedRating}
      {ratingsCount == undefined ? null : (
        <chakra.span color="rgba(69,69,69,0.6)">({ratingsCount})</chakra.span>
      )}
    </HStack>
  );
}
