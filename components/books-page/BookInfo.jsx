import { StarIcon } from "@chakra-ui/icons";
import { Box, chakra, Heading, HStack, Tag, VStack } from "@chakra-ui/react";

export default function BookInfo({ title, rating, authors, tags }) {
  const tagsComponent = tags?.map((tag) => (
    <Tag key={tag} bgColor="#4DB6AC" color="white" p="0.5em" fontSize="0.8rem">
      {tag}
    </Tag>
  ));

  return (
    <VStack
      p="0 1.5em"
      mb="1em !important"
      justify="space-between"
      textAlign="center"
      flex="1"
    >
      <Box mb="1em">
        <Heading as="h4" fontSize="1.5rem" mb="0.3em">
          {title}
        </Heading>
        <Box fontSize="0.8rem" color="rgba(69,69,69,0.7)">
          {authors?.join(", ")}
        </Box>
        {rating >= 0 ? (
          <HStack mt="0.5em" align="center" justify="center">
            <StarIcon color="#FFF06B" />
            <chakra.span fontWeight="bold !important">{rating}</chakra.span>
          </HStack>
        ) : null}
      </Box>
      <HStack justify="center" mt="1em">
        {tagsComponent}
      </HStack>
    </VStack>
  );
}
