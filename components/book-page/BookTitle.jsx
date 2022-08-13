import { chakra, Heading } from "@chakra-ui/react";

export default function BookTitle({ title, subtitle }) {
  return (
    <chakra.hgroup>
      <Heading color="#3e823b" mb="0.5em" fontSize="2.8rem">
        {title}
      </Heading>
      <Heading as="h3" gridRow="2 / 3">
        {subtitle}
      </Heading>
    </chakra.hgroup>
  );
}
