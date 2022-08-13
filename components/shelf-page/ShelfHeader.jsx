import { AddIcon } from "@chakra-ui/icons";
import { Heading, HStack, IconButton } from "@chakra-ui/react";
import React from "react";
import Button from "../PrimaryButton";

export default function ShelfHeader({ title, code, onOpen, isShelfEmpty }) {
  return (
    <HStack mb="1em" justify="space-between">
      <Heading color="#3e823b" fontSize="2em">
        {title}
      </Heading>
      {!isShelfEmpty ? (
        <Button
          onClick={() => onOpen({ title, code })}
          as={IconButton}
          icon={<AddIcon />}
        />
      ) : null}
    </HStack>
  );
}
