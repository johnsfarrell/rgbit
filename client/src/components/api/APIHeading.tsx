import { As, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

interface APIHeadingProps {
  text: string;
  id?: string;
  h?: As;
}

const APIHeading = ({ text, id, h }: APIHeadingProps) => {
  if (!id) id = text;

  const [hover, setHover] = useState<boolean>(false);

  return (
    <Heading
      as={h ?? "h2"}
      id={id}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      pos="relative"
      left="-1.05em"
      display="flex"
    >
      <a href={`#${id}`}>
        <Text
          position="relative"
          display="inline"
          opacity={hover ? 1 : 0}
          transition="0.1s all"
          left={hover ? 0 : -2}
        >
          <u>#</u>
        </Text>{" "}
        {text}
      </a>
    </Heading>
  );
};

export default APIHeading;
