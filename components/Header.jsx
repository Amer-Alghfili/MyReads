import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <chakra.header p={{ base: "2em", md: "4em" }}>
      <div className="double-container">
        <HStack align="center" justify="space-between">
          <Link href="/">
            <a>
              <Heading as="h1">MyReads</Heading>
            </a>
          </Link>
          <nav>
            {/** Mobile nav */}
            <Box display={["block", "none"]}>
              <Menu>
                <MenuButton
                  bgColor="transparent"
                  as={IconButton}
                  icon={<HamburgerIcon p="1em" w="3.8em" h="3.8em" />}
                />
                <MenuList>
                  <Link href="/books">
                    <MenuItem>
                      <a>Books</a>
                    </MenuItem>
                  </Link>
                  <Link href="/shelves">
                    <MenuItem>
                      <a>Shelves</a>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Box>
            {/** Desktop nav */}
            <Box display={["none", "block"]}>
              <HStack spacing="2em">
                <Link href="/books">
                  <a>Books</a>
                </Link>
                <Link href="/shelves">
                  <a>Shelves</a>
                </Link>
              </HStack>
            </Box>
          </nav>
        </HStack>
      </div>
    </chakra.header>
  );
}
