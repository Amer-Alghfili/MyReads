import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, chakra, Heading, HStack } from "@chakra-ui/react";
import React from "react";

export default function EmptySearch({ openModal }) {
  const finalRef = React.useRef(null);

  return (
    <HStack textAlign="center" m="auto">
      <chakra.img
        display="block"
        h="10em"
        w="12em"
        src="/assets/no-books.svg"
        alt="trying to add a new book"
      />
      <Box alignSelf="flex-end">
        <Heading as="h3" mb="2em" fontSize="1.6rem">
          Unfortunately we couldn&apos;t find books on this shelf
        </Heading>
        <Button
          ref={finalRef}
          mb="0.5em"
          p="1.5em 1em"
          onClick={openModal}
          leftIcon={<AddIcon />}
          bg="#3e823b"
          _hover={{
            textDecoration: "none",
            bgColor: "#50a64c",
          }}
          _focus={{
            textDecoration: "none",
            bgColor: "#50a64c",
            outline: "none",
          }}
          color="white"
        >
          New Book
        </Button>
      </Box>
    </HStack>
  );
}
