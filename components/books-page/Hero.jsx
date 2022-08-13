import { Box, chakra, Heading, VStack } from "@chakra-ui/react";
import SearchInput from "../SearchInput";

export default function Hero({ searchQuery, searchChange }) {
  return (
    <chakra.section
      p={{ base: "2em", md: "4em" }}
      bgImage="linear-gradient(to bottom, rgb(48, 99, 44), rgba(56, 219, 29, 0.2)), url('/assets/book-search.jpg')"
      transform={{
        base: "skewY(-3deg)",
        md: "skewY(-3deg) translateY(-2em)",
        xl: "skewY(-3deg)",
      }}
      color="white"
    >
      <div className="double-container">
        <VStack alignItems="center" transform="skewY(3deg)" m="3em">
          <Box mb="3em" textAlign="center">
            <Heading mb="0.5em" fontSize="2.8rem">
              Explore new books
            </Heading>
            <chakra.p fontSize="1.5rem">Add new books to your shelves</chakra.p>
          </Box>
          <SearchInput
            value={searchQuery}
            onChange={(e) => searchChange(e.target.value)}
            maxW="29em"
          />
        </VStack>
      </div>
    </chakra.section>
  );
}
