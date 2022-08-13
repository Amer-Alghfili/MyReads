import { chakra } from "@chakra-ui/react";

export default function ServiceImg({ src, alt }) {
  return (
    <chakra.img
      src={src}
      alt={alt}
      display="block"
      w="20em"
      h="20em"
      flex={{ xl: "50%" }}
      order={{ base: -1, md: 0 }}
      mb={{ base: "3em !important", md: 0 }}
      ms={{ base: 0, xl: "2em" }}
      transform={{ xl: "translateX(-5em)" }}
    />
  );
}
