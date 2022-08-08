import {
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";

export default function CustomModalContent({ title, children }) {
  return (
    <ModalContent
      p="1em"
      maxW="50%"
      minH={{ base: "auto", md: "75vh !important" }}
      bgColor="#F5FFF2"
      overflow="hidden"
    >
      <ModalHeader textAlign="center">
        <Heading
          as="h5"
          color="#454545"
          fontSize="2rem"
          m={{ base: "3em 0 2em", md: "2em 0 2em" }}
        >
          {title}
        </Heading>
      </ModalHeader>
      <ModalCloseButton
        fontSize="1rem"
        w="2em"
        h="2em"
        top="1em !important"
        right="1em !important"
      />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  );
}
