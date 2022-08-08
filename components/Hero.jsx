import { Box, chakra, Heading, HStack, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="double-container">
      <Stack direction={{ base: "column", md: "row" }} align="center">
        <Box
          flex={{ xl: "50%" }}
          me={{ base: "0.5em", xl: "7em" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading color="#3e823b" fontSize="3.5rem" mb="0.5em">
            Focus on one thing
          </Heading>
          <chakra.p fontSize="1.5em" lineHeight={{ base: 1.3, md: 1.7 }}>
            MyReads allows you to organize your library digitally, our goal is
            to let you focus on the book you&apos;re currently reading and leave
            the task of organizing other books to us
          </chakra.p>
          <HStack
            justifyContent={{ base: "center", md: "flex-start" }}
            alignItems="center"
            mt="2em"
            spacing="1.5em"
          >
            <NextLink href="/books" passHref>
              <Link
                bgColor="#3e823b"
                color="white"
                p="0.8em 1.5em"
                borderRadius="0.3em"
                _hover={{
                  textDecoration: "none",
                  bgColor: "#50a64c",
                }}
                _focus={{
                  textDecoration: "none",
                  bgColor: "#50a64c",
                  outline: "none",
                }}
              >
                Explore books
              </Link>
            </NextLink>
            <chakra.a href="#services" color="#3e823b">
              See our services
            </chakra.a>
          </HStack>
        </Box>
        <chakra.img
          src="/assets/hero.svg"
          alt="Man reading a book"
          display="block"
          w="28em"
          h="28em"
          flex={{ xl: "50%" }}
          order={{ base: -1, md: 0 }}
          mb={{ base: "3em !important", md: 0 }}
          ms={{ base: 0, xl: "2em" }}
        />
      </Stack>
    </div>
  );
}
