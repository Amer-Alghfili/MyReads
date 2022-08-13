import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function SearchInput(props) {
  return (
    <InputGroup w="100%" {...props}>
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
        {...props}
      />
    </InputGroup>
  );
}
