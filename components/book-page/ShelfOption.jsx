import { Box, Heading, useRadio, VStack } from "@chakra-ui/react";

export default function ShelfOption(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const { src, title, description, bg } = props;

  return (
    <Box
      as="label"
      w="calc(16em - 3em)"
      me="3em !important"
      mb="2em !important"
    >
      <input {...input} />
      <Box
        {...checkbox}
        role="group"
        h="100%"
        cursor="pointer"
        borderRadius="1em"
        boxShadow="md"
        _focus={{
          boxShadow: "outline",
        }}
        position="relative"
        _checked={{
          border: "1px solid teal.600",
        }}
      >
        <Box
          backgroundColor="#D9D9D9"
          content="''"
          position="absolute"
          width="1em"
          height="1em"
          top="0.5em"
          right="0.5em"
          borderRadius="50%"
          borderWidth="0.3em"
          _groupChecked={{ borderColor: "#4DB6AC" }}
        />
        <VStack
          h="100%"
          justify="center"
          borderRadius="1em"
          spacing={0}
          bgColor="green"
          px="1.5em"
          pt="2em"
          pb="1em"
          color="white"
          bgGradient={bg}
          textAlign="center"
        >
          <img src={src} alt={`${title} book shelf`} />
          <Heading as="h6" m="1em 0 !important" fontSize="1.3em">
            {title}
          </Heading>
        </VStack>
      </Box>
    </Box>
  );
}
