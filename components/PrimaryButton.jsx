import { Button } from "@chakra-ui/react";

export default function PrimaryButton({ children, ...props }) {
  return (
    <Button
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
      {...props}
    >
      {children}
    </Button>
  );
}
