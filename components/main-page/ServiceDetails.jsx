import { Box, chakra, Heading } from "@chakra-ui/react";

export default function ServiceDetails({ title, description }) {
  return (
    <Box flex={{ xl: "50%" }} textAlign={{ base: "center", md: "left" }}>
      <Heading as="h4" color="#3e823b" fontSize="2.4em" mb="0.5em">
        {title}
      </Heading>
      <chakra.p fontSize="1.6em" lineHeight={{ base: 1.3, md: 1.7 }}>
        {description}
      </chakra.p>
    </Box>
  );
}
