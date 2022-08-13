import { Box, Heading, Stack } from "@chakra-ui/react";
import ServiceDetails from "./ServiceDetails";
import ServiceImg from "./ServiceImg";

export default function Services({ children }) {
  return (
    <>
      <Heading
        as="h3"
        fontSize="2.8em"
        mb={{ base: ".5em", md: "4em" }}
        mt={{ base: "1em", md: 0 }}
        textAlign="center"
      >
        Our Services
      </Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        mb={{ base: "6em", md: "13em" }}
        px={{ base: 0, md: "5em", xl: 0 }}
      >
        <ServiceDetails
          title="Explore new books"
          description="Search for books that interests you"
        />
        <Box ml={{ md: "auto !important" }}>
          <ServiceImg
            src="/assets/search.svg"
            alt="Search results illustration"
          />
        </Box>
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        mb={{ base: "6em", md: "13em" }}
        px={{ base: 0, md: "5em", xl: 0 }}
      >
        <ServiceImg
          src="/assets/shelves.svg"
          alt="Girl holding a book to put it on the books shelves"
        />
        <Box ml={{ md: "auto !important" }}>
          <ServiceDetails
            title="Orginize your books"
            description="Use our shelves to categorize your books"
          />
        </Box>
      </Stack>
    </>
  );
}
