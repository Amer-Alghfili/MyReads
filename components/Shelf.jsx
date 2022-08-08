import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Feedback from "../components/Feedback";
import ModalContent from "../components/ModalContent";
import { getAll, search } from "../services/bookAPI";
import { extractBookImgSrc } from "../util/extractBookImgSrc";

export default function Shelf({ books, shelfTitle, shelf, onAddBook }) {
  const toast = useToast();
  const [addedBookId, setAddedBookId] = React.useState("");
  const [searchBooks, setSearchBooks] = React.useState([]);
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = React.useState("");
  async function AddBookToShelf(book) {
    try {
      await onAddBook(book, shelf);
      toast({
        render: (props) => (
          <Feedback
            {...props}
            title="Book added successfully"
            description={
              <>
                {book.title} has been added to
                {<chakra.span fontStyle="italic"> {shelf} </chakra.span>} shelf
                successfully
              </>
            }
          />
        ),
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setAddedBookId(book.id);
    } catch (err) {
      toast({
        render: (props) => (
          <Feedback
            {...props}
            variant="fail"
            title="Book added successfully"
            description={
              <>
                Couldn&apos;t add {book.title} to
                <chakra.span fontStyle="italic"> {shelf} </chakra.span> shelf
              </>
            }
          />
        ),
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  React.useEffect(
    function afterAddingBookEffect() {
      if (addedBookId) {
        const newSearchBooks = searchBooks.filter(
          ({ id }) => id != addedBookId
        );
        setSearchBooks(newSearchBooks);
        setAddedBookId("");
      }
    },
    [addedBookId]
  );

  React.useEffect(
    function modalSearchEffect() {
      async function modalSearch() {
        const searchBooks = await search(query);
        if (!searchBooks.length) {
          return setSearchBooks([]);
        }
        const excludedBooks = await getAll();
        const excludedBooksIds = excludedBooks
          .filter((book) => book.shelf == shelf)
          .map(({ id }) => id);
        const filerShelfBooks = searchBooks.filter(
          ({ id }) => !excludedBooksIds.includes(id)
        );
        setSearchBooks(filerShelfBooks);
      }
      if (query && isOpen) {
        modalSearch();
      } else {
        setQuery("");
        setSearchBooks([]);
      }
    },
    [query, isOpen]
  );

  let renderedContent;
  if (books.length) {
    const getBookStyle = (isDragging, draggableStyle) => ({
      // background: isDragging ? "lightgreen" : "grey",
      display: "flex",
      alignItems: "flex-end",
      margin: "0 2em",
      height: "16em",
      width: "10em",
      zIndex: 1,
      flexShrink: 0,
      ...draggableStyle,
    });
    renderedContent = books.map(({ id, imageLinks }, index) => {
      const img = extractBookImgSrc(imageLinks);
      return (
        <Draggable key={id} draggableId={id.toString()} index={index}>
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getBookStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <Box
                  boxShadow="2em 5em 60px 1px rgba(115, 115, 117, 0.7)"
                  backgroundImage={`url(&apos;${img}&apos;)`}
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  w="100%"
                  h="14em"
                  position="relative"
                  borderRight="none"
                  borderRadius="0.3em"
                  _after={{
                    content: "''",
                    bgGradient:
                      "repeating-linear-gradient(to-r,  #bec2bf, #bec2bf 3px, white 10px, white 1px)",
                    display: "inline-block",
                    transform: "perspective(2000px) rotateY(75deg)",
                    transformOrigin: "left",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: "-3em",
                    bgColor: "grey",
                    w: "3em",
                  }}
                />
              </div>
            );
          }}
        </Draggable>
      );
    });
  } else {
    renderedContent = (
      <HStack textAlign="center" m="auto">
        <chakra.img
          display="block"
          h="10em"
          w="12em"
          src="/assets/no-books.svg"
          alt="trying to add a new book"
        />
        <Box alignSelf="flex-end">
          <Heading as="h3" mb="2em" fontSize="1.6rem">
            Unfortunately we couldn&apos;t find books on this shelf
          </Heading>
          <Button
            ref={finalRef}
            mb="0.5em"
            p="1.5em 1em"
            onClick={onOpen}
            leftIcon={<AddIcon />}
            bg="#3e823b"
            _hover={{
              textDecoration: "none",
              bgColor: "#50a64c",
            }}
            _focus={{
              textDecoration: "none",
              bgColor: "#50a64c",
              outline: "none",
            }}
            color="white"
          >
            New Book
          </Button>
        </Box>
      </HStack>
    );
  }
  return (
    <chakra.section>
      <HStack mb="1em" justify="space-between">
        <Heading color="#3e823b" fontSize="2em">
          {shelfTitle}
        </Heading>
        {books.length ? (
          <Button
            ref={finalRef}
            onClick={onOpen}
            as={IconButton}
            icon={<AddIcon />}
            bg="#3e823b"
            _hover={{
              textDecoration: "none",
              bgColor: "#50a64c",
            }}
            _focus={{
              textDecoration: "none",
              bgColor: "#50a64c",
              outline: "none",
            }}
            color="white"
            p={0}
          />
        ) : null}
      </HStack>
      <Box
        display="flex"
        alignItems="flex-end"
        h="20em"
        mx={{ base: "-2em", md: "-4em" }}
        mb="4em"
        p="1em"
        pb="2em"
        boxShadow={{ base: "2xl", "2xl": "none" }}
        position="relative"
        _before={{
          content: "''",
          boxShadow: "inset 0 1px 0 #D0A97A",
          bgColor: "#C19A6B",
          bgGradient: "linear-gradient(to bottom, #C19A6B 0%, #B28B5C 100%)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          h: "6em",
          zIndex: 2,
        }}
        _after={{
          content: "''",
          bgColor: "#ab8354",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          h: "1em",
          zIndex: 2,
        }}
      >
        <Droppable droppableId={shelf} direction="horizontal" type="SHELF">
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  overflow: "auto",
                  margin: books.length ? 0 : "0 auto",
                  display: "flex",
                  position: "relative",
                  zIndex: 3,
                }}
              >
                {renderedContent}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            title={
              <>
                Add book to
                <chakra.span fontStyle="italic">{` ${shelfTitle} `}</chakra.span>
                shelf
              </>
            }
          >
            <InputGroup w="100%" maxW="50.61em" m="auto" mb="3em">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="white" />
              </InputLeftElement>
              <Input
                type="search"
                placeholder="Search..."
                _placeholder={{ color: "white" }}
                bgColor="rgba(90, 188, 86, 0.9)"
                color="white"
                borderRadius="1.2em"
                border="none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
            {searchBooks.length ? (
              <VStack
                wrap="wrap"
                align="stretch"
                justify="center"
                alignContent={{
                  base: "flex-start !important",
                  "2xl": "center !important",
                }}
                spacing={0}
                m="auto !important"
                me="-3em"
              >
                {searchBooks?.map((book, index) => {
                  const { id, imageLinks, title, authors } = book;
                  const imgSrc = extractBookImgSrc(imageLinks);
                  return (
                    <HStack
                      key={id}
                      mb="2em !important"
                      p="1em"
                      borderBottom={
                        index < searchBooks.length - 1 ? "1px solid #E0E0E0" : 0
                      }
                    >
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={`${title} book image`}
                          width={100}
                          height={100}
                          style={{ borderRadius: "0.3em" }}
                        />
                      ) : (
                        <Box
                          w="6.25em"
                          h="6.25em"
                          bgColor="#454545"
                          borderRadius="0.3em"
                        />
                      )}

                      <VStack
                        flex="70%"
                        align="flex-start"
                        ms="1.5em !important"
                        me="1em !important"
                      >
                        <Heading as="h4" fontSize="1.5rem">
                          {title}
                        </Heading>
                        <Box fontSize="0.8rem" color="#717171">
                          {authors?.join(", ")}
                        </Box>
                      </VStack>
                      <Button
                        ref={finalRef}
                        onClick={() => AddBookToShelf(book)}
                        as={IconButton}
                        icon={<AddIcon />}
                        bg="#3e823b"
                        _hover={{
                          textDecoration: "none",
                          bgColor: "#50a64c",
                        }}
                        _focus={{
                          textDecoration: "none",
                          bgColor: "#50a64c",
                          outline: "none",
                        }}
                        color="white"
                        p={0}
                        ms="auto !important"
                      />
                    </HStack>
                  );
                })}
              </VStack>
            ) : (
              <VStack>
                <chakra.img
                  src="assets/search-empty.svg"
                  alt="Someone searching for results"
                  transform="translateX(-2em)"
                  w="14em"
                  h="14em"
                />
                <chakra.p mt="2em !important" fontSize="1.6rem" color="#3e823b">
                  Couldn&apos;t find results
                </chakra.p>
              </VStack>
            )}
          </ModalContent>
        </Modal>
      </Box>
      {/* </div> */}
    </chakra.section>
  );
}
