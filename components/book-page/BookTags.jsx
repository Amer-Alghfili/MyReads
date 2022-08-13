import { HStack, Tag } from "@chakra-ui/react";

export default function BookTags({ tags }) {
  const renderedTags = tags?.map((tag) => (
    <Tag key={tag} bgColor="#4DB6AC" color="white" p="0.5em">
      {tag}
    </Tag>
  ));
  return <HStack>{renderedTags}</HStack>;
}
