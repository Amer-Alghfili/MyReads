import { Box } from "@chakra-ui/react";

export default function ShelfBooksContainer({ children }) {
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      h="20em"
      mx={{ base: "-2em", md: "-4em" }}
      mb="4em"
      p="1em"
      pb="2em"
      boxShadow={{ base: "2xl", "2xl": "none" }}
      position="relative"
      _before={{
        content: "''",
        boxShadow: "inset 0 1px 0 #D0A97A",
        bgColor: "#C19A6B",
        bgGradient: "linear-gradient(to bottom, #C19A6B 0%, #B28B5C 100%)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        h: "6em",
        zIndex: 2,
      }}
      _after={{
        content: "''",
        bgColor: "#ab8354",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        h: "1em",
        zIndex: 2,
      }}
    >
      {children}
    </Box>
  );
}
