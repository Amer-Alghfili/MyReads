import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { extractBookImgSrc } from "../../util";

export default function BookImage({ title, imageLinks }) {
  const img = extractBookImgSrc(imageLinks);

  if (img) {
    return (
      <Box
        h="22em"
        w="100%"
        position="relative"
        borderRadius="0.5em"
        boxShadow="2xl"
      >
        <Image
          style={{ borderRadius: "0.5em" }}
          src={img}
          alt={`${title} img`}
          layout="fill"
          objectFit="cover"
          objectPosition="top center"
        />
      </Box>
    );
  }
}
