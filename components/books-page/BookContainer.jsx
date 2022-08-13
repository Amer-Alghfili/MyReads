import { Box, Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

export default function BookContainer({ bookId, children }) {
  return (
    <NextLink href={`/books/${bookId}`} passHref>
      <Link
        _hover={{ textDecoration: "none" }}
        mb="6em !important"
        me="3em !important"
        role="group"
      >
        <Box h="100%">
          <VStack
            boxShadow="xl"
            bgGradient="linear(to-br, rgba(77, 182, 172, 0.5), rgba(6, 142, 0, 0.1))"
            _groupHover={{
              bgGradient:
                "linear(to-br, rgba(6, 142, 0, 0.1) , rgba(77, 182, 172, 0.5))",
            }}
            _groupFocus={{
              bgGradient:
                "linear(to-br, rgba(6, 142, 0, 0.1) , rgba(77, 182, 172, 0.5))",
            }}
            w="18em"
            h="100%"
            borderRadius="0.7em"
          >
            {children}
          </VStack>
        </Box>
      </Link>
    </NextLink>
  );
}
