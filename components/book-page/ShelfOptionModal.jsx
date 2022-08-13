import { HStack, Modal, ModalOverlay, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import ModalContent from "../ModalContent";
import ShelfOption from "./ShelfOption";

// export default function ShelfOptionModal({ newShelf, currentShelf }) {
export default function ShelfOptionModal({
  onShelfChange,
  defaultShelf,
  isOpen,
  onClose,
}) {
  const finalRef = React.useRef(null);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "shelf",
    defaultValue: defaultShelf,
    onChange: (newShelf) => {
      //   setNewShelf(newShelf);
      onShelfChange(newShelf);
    },
  });

  const group = getRootProps();

  //   React.useEffect(
  //     function newShelfEffect() {
  //       async function updateShelf() {
  //         try {
  //           await update(book, newShelf);
  //           setCurrentShelf(newShelf);
  //         } catch (err) {}
  //       }
  //       if (isOpen && newShelf != currentShelf) {
  //         updateShelf();
  //       }
  //     },
  //     [newShelf]
  //   );

  return (
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
            {...getRadioProps({ value: "read" })}
            src="/assets/read.svg"
            title="Read"
            description="Books that you finish reading them"
            bg="linear(to-br, rgb(69, 124, 67), rgba(90, 188, 86, 0.6))"
          />
          <ShelfOption
            {...getRadioProps({ value: "currentlyReading" })}
            src="/assets/reading.svg"
            title="Currently Reading"
            description="Holds books that you're reading"
            bg="linear(to-br, rgb(167, 126, 22), rgba(224, 222, 0, 0.75))"
          />

          <ShelfOption
            {...getRadioProps({ value: "wantToRead" })}
            src="/assets/want-to-read.svg"
            title="Want to Read"
            description="For future reading books"
            bg="linear(to-br, rgb(77, 182, 172), rgb(41, 106, 100))"
          />
        </HStack>
      </ModalContent>
    </Modal>
  );
}
