import { Box, Heading, HStack, VStack } from "@chakra-ui/react";
export default function BookAdditionalInfo({
  authors,
  publisher,
  publishedDate,
  pageCount,
}) {
  return (
    <VStack align="flex-start">
      <Heading
        as="h3"
        fontSize="2.2rem"
        color="#3e823b"
        mb={{ base: "1em", md: 0 }}
      >
        Book information
      </Heading>
      <HStack mt={{ base: 0, md: "2em !important" }} wrap="wrap">
        <Box w="calc(50% - 1em)" m="0 !important" me="1em !important">
          <Heading as="h4" fontSize="1.7rem">
            Authors:
          </Heading>
          <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
            {authors}
          </Box>
        </Box>
        <Box w="50%" m="0 !important">
          <Heading as="h4" fontSize="1.7rem">
            Publication Date:
          </Heading>
          <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
            {publishedDate}
          </Box>
        </Box>
        <Box w="calc(50% - 1em)" m="0 !important" me="1em !important">
          <Heading as="h4" fontSize="1.7rem">
            Page Count:
          </Heading>
          <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
            {pageCount}
          </Box>
        </Box>
        <Box w="50%" m="0 !important">
          <Heading as="h4" fontSize="1.7rem">
            Publisher:
          </Heading>
          <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
            {publisher}
          </Box>
        </Box>
      </HStack>
    </VStack>
  );
}
