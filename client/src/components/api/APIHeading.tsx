import { As, Heading } from "@chakra-ui/react";

interface APIHeadingProps {
  text: string;
  id?: string;
  h?: As;
}

const APIHeading = ({ text, id, h }: APIHeadingProps) => {
  if (!id) id = text;

  return (
    <Heading as={h ?? "h2"} id={id}>
      {text}
    </Heading>
  );
};

export default APIHeading;
