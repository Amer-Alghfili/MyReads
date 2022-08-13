import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function BookImage({ img, title }) {
  return (
    <Box
      position="relative"
      bgGradient="linear(to-br, rgba(77, 182, 172), rgba(6, 142, 0))"
      w="97%"
      h="10em"
      transform="translateY(-1em)"
      boxShadow="xl"
      transition="all 0.5s ease-in-out"
      _groupHover={{
        transform: "translateX(0)",
      }}
      _groupFocus={{
        transform: "translateX(0)",
      }}
      _groupFocusVisible={{
        transform: "translateX(0)",
      }}
      borderRadius="0.5em"
    >
      {img ? (
        <Image
          style={{ borderRadius: "0.5em" }}
          src={img}
          alt={`${title} img`}
          layout="fill"
          objectFit="cover"
          objectPosition="top center"
        />
      ) : null}
    </Box>
  );
}
