import { CheckCircleIcon, CloseIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  Button,
  chakra,
  Heading,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
export default function Feedback({
  id,
  onClose,
  title,
  description,
  onAddBook,
  variant,
}) {
  return (
    <HStack
      justifyContent="center"
      backdropFilter="blur(10px)"
      bgColor={
        variant == "fail"
          ? "rgba(133, 56, 69, 0.8)"
          : "rgba(166, 194, 159, 0.6)"
      }
      p="1.5em 3em"
      mt="1em"
      borderRadius="0.4em"
      color={variant == "fail" ? "#450e17" : "#3e823b"}
      boxShadow="2xl"
      position="relative"
    >
      <Button
        onClick={onClose}
        as={IconButton}
        icon={<CloseIcon />}
        position="absolute"
        top={0}
        right={0}
        borderRadius="50%"
        w="3em"
        h="3em"
        fontSize="0.8em"
        bg="transparent"
        color={variant == "fail" ? "white" : "#454545"}
      />
      {variant == "fail" ? (
        <NotAllowedIcon w="1.5em" h="1.5em" boxShadow="xl" />
      ) : (
        <CheckCircleIcon w="1.5em" h="1.5em" boxShadow="xl" />
      )}
      <VStack align="flex-start" ms="4em !important">
        <Heading as="h5" fontSize="1.3rem">
          {title}
        </Heading>
        <chakra.p color={variant == "fail" ? "#edc5cb" : "#454545"}>
          {description}
        </chakra.p>
      </VStack>
    </HStack>
  );
}
