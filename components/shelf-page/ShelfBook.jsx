import { Box } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";

export default function ShelfBook({ img, id, index }) {
  const getBookStyle = (isDragging, draggableStyle) => ({
    display: "flex",
    alignItems: "flex-end",
    margin: "0 2em",
    height: "16em",
    width: "10em",
    zIndex: 1,
    flexShrink: 0,
    ...draggableStyle,
  });

  return (
    <Draggable draggableId={id.toString()} index={index}>
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
              backgroundImage={`url('${img}')`}
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
}
