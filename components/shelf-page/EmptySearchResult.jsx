import { chakra, VStack } from "@chakra-ui/react";

export default function EmptySearchResult() {
  return (
    <VStack>
      <chakra.img
        src="assets/search-empty.svg"
        alt="Someone searching for results"
        transform="translateX(-2em)"
        w="14em"
        h="14em"
      />
      <chakra.p mt="2em !important" fontSize="1.6rem" color="#3e823b">
        Couldn&apos;t find results
      </chakra.p>
    </VStack>
  );
}
