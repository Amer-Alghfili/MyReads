import { chakra, Heading } from "@chakra-ui/react";

export default function BookDescription({ description }) {
  return (
    <>
      <Heading as="h3" color="#3e823b" mb="0.7em" fontSize="2.8rem">
        Description
      </Heading>
      <chakra.p lineHeight="1.7 !important" fontSize="1.2rem">
        {description}
      </chakra.p>
    </>
  );
}
