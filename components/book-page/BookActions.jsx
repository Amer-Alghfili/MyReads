import { AddIcon } from "@chakra-ui/icons";
import { HStack, Link } from "@chakra-ui/react";
import React from "react";
import { IoShuffleOutline } from "react-icons/io5";
import Button from "../PrimaryButton";

export default function BookActions({ previewLink, shelf, onPrimaryClick }) {
  return (
    <>
      <HStack mt="2em !important">
        <Button
          me="2em"
          p="1.5em 1em !important"
          borderRadius="0.3em"
          leftIcon={shelf == "none" ? <AddIcon /> : <IoShuffleOutline />}
          onClick={onPrimaryClick}
        >
          {shelf == "none" ? "Add to Shelf" : "Change Shelf"}
        </Button>
        <Link href={previewLink} color="rgba(69,69,69,0.8)">
          Visit on google
        </Link>
      </HStack>
    </>
  );
}
