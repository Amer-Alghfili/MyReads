import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { extractBookImgSrc } from "../../util";
import Button from "../PrimaryButton";

export default function SearchBookItem({ book, isLastItem, onAdd }) {
  const { imageLinks, title, authors } = book;
  const imgSrc = extractBookImgSrc(imageLinks);

  return (
    <HStack
      mb="2em !important"
      p="1em"
      borderBottom={isLastItem ? 0 : "1px solid #E0E0E0"}
    >
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={`${title} book image`}
          width={100}
          height={100}
          style={{ borderRadius: "0.3em" }}
        />
      ) : (
        <Box w="6.25em" h="6.25em" bgColor="#454545" borderRadius="0.3em" />
      )}

      <VStack
        flex="70%"
        align="flex-start"
        ms="1.5em !important"
        me="1em !important"
      >
        <Heading as="h4" fontSize="1.5rem">
          {title}
        </Heading>
        <Box fontSize="0.8rem" color="#717171">
          {authors?.join(", ")}
        </Box>
      </VStack>
      <Button onClick={() => onAdd(book)} as={IconButton} icon={<AddIcon />} />
    </HStack>
  );
}
