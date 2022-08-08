import { AddIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Grid,
  Heading,
  HStack,
  Link,
  Modal,
  ModalOverlay,
  Tag,
  useDisclosure,
  useRadio,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { IoShuffleOutline } from "react-icons/io5";
import ModalContent from "../components/ModalContent";
import { update } from "../services/bookAPI";
import { extractBookImgSrc } from "../util/extractBookImgSrc";

export default function BookInfo({ onShelfChange, book }) {
  const {
    id,
    title,
    subtitle,
    authors,
    categories,
    averageRating,
    imageLinks,
    shelf,
    description,
    previewLink,
    pageCount,
    publishedDate,
    publisher,
    ratingsCount,
  } = book;
  const [newShelf, setNewShelf] = React.useState(shelf);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "shelf",
    defaultValue: shelf,
    onChange: (newShelf) => setNewShelf(newShelf),
  });

  const group = getRootProps();

  React.useEffect(
    function newShelfEffect() {
      async function updateShelf() {
        try {
          await update(book, newShelf);
        } catch (err) {
          console.log(err);
        }
      }
      if (isOpen && newShelf) {
        updateShelf();
      }
    },
    [newShelf, isOpen, book]
  );

  const img = extractBookImgSrc(imageLinks);
  const renderedTags = categories?.map((tag) => (
    <Tag key={tag} bgColor="#4DB6AC" color="white" p="0.5em">
      {tag}
    </Tag>
  ));

  const renderedRating = [];
  for (let i = 0; i < averageRating; i++) {
    renderedRating.push(<StarIcon key={i} color="#dbdb42" />);
  }
  return (
    <>
      <Grid
        gridTemplateColumns="28em 0.1em 1fr"
        gridTemplateRows="1fr 1fr 22em"
        gridColumnGap={{ base: "0", md: "2em" }}
        gridRowGap={{ base: "2em" }}
        justifyContent="center"
      >
        <chakra.hgroup gridColumn={{ base: "1 / -1", md: "1 / 2" }}>
          <Heading color="#3e823b" mb="0.5em" fontSize="2.8rem">
            {title}
          </Heading>
          <Heading as="h3" gridRow="2 / 3">
            {subtitle}
          </Heading>
        </chakra.hgroup>
        {img ? (
          <Box
            h="calc(100% - 1em)"
            w="100%"
            position="relative"
            gridColumn={{ base: "1 / -1", md: "1 / 2" }}
            gridRow={{ base: "3 / 4", md: "2 / -1" }}
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
        ) : null}
        <Box
          display={{ base: "none", md: "block" }}
          gridColumn="2 / 3"
          gridRow="1 / -1"
          bgColor="#AEAEAE"
          borderRadius="1em"
        />
        <VStack
          gridColumn={{ base: "1 / -1", md: "3 / -1" }}
          gridRow={{ base: "2 / 3", md: "1 / 2" }}
          align="flex-start"
          justify="flex-start !important"
        >
          <HStack mb={{ base: 0, md: "1em !important" }}>
            {renderedRating}
            {ratingsCount == undefined ? null : (
              <chakra.span color="rgba(69,69,69,0.6)">
                ({ratingsCount})
              </chakra.span>
            )}
          </HStack>
          <HStack>{renderedTags}</HStack>
        </VStack>
        <VStack
          gridColumn={{ base: "1 / -1", md: "3 / -1" }}
          gridRow={{ md: "2 / -1" }}
          align="flex-start"
        >
          <Heading
            as="h3"
            fontSize="2.2rem"
            color="#3e823b"
            mb={{ base: "1em", md: 0 }}
          >
            Book information
          </Heading>
          <HStack mt={{ base: 0, md: "2em !important" }} wrap="wrap">
            <Box w="calc(50% - 1em)" m="0 !important" me="1em !important">
              <Heading as="h4" fontSize="1.7rem">
                Authors:
              </Heading>
              <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
                {authors}
              </Box>
            </Box>
            <Box w="50%" m="0 !important">
              <Heading as="h4" fontSize="1.7rem">
                Publication Date:
              </Heading>
              <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
                {publishedDate}
              </Box>
            </Box>
            <Box w="calc(50% - 1em)" m="0 !important" me="1em !important">
              <Heading as="h4" fontSize="1.7rem">
                Page Count:
              </Heading>
              <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
                {pageCount}
              </Box>
            </Box>
            <Box w="50%" m="0 !important">
              <Heading as="h4" fontSize="1.7rem">
                Publisher:
              </Heading>
              <Box color="rgba(69,69,69,0.6)" m="0.5em 0 !important">
                {publisher}
              </Box>
            </Box>
          </HStack>
          <HStack mt="2em !important">
            <Button
              ref={finalRef}
              me="2em"
              p="1.5em 1em !important"
              borderRadius="0.3em"
              leftIcon={newShelf == "none" ? <AddIcon /> : <IoShuffleOutline />}
              bgColor="#3e823b"
              color="white"
              _hover={{
                textDecoration: "none",
                bgColor: "#50a64c",
              }}
              _focus={{
                textDecoration: "none",
                bgColor: "#50a64c",
                outline: "none",
              }}
              onClick={onOpen}
            >
              {newShelf == "none" ? "Add to Shelf" : "Change Shelf"}
            </Button>
            <Link href={previewLink} color="rgba(69,69,69,0.8)">
              Visit on google
            </Link>
          </HStack>
        </VStack>
      </Grid>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent title="Choose a Shelf">
          <HStack
            {...group}
            wrap="wrap"
            align="stretch"
            justify="center"
            alignContent="flex-start !important"
            spacing={0}
            me="-3em"
          >
            <ShelfOption
              src="/assets/read.svg"
              title="Read"
              description="Books that you finish reading them"
              bg="linear(to-br, rgb(69, 124, 67), rgba(90, 188, 86, 0.6))"
              {...getRadioProps({ value: "read" })}
            />
            <ShelfOption
              {...getRadioProps({ value: "currentlyReading" })}
              src="/assets/reading.svg"
              title="Currently Reading"
              description="Holds books that you're reading"
              bg="linear(to-br, rgb(167, 126, 22), rgba(224, 222, 0, 0.75))"
            />

            <ShelfOption
              src="/assets/want-to-read.svg"
              title="Want to Read"
              description="For future reading books"
              bg="linear(to-br, rgb(77, 182, 172), rgb(41, 106, 100))"
              {...getRadioProps({ value: "wantToRead" })}
            />
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
}

function ShelfOption(props) {
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
