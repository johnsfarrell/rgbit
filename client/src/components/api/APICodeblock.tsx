import { Code } from "@chakra-ui/react";

const APICodeblock = ({ code }: { code: string }) => {
  const codeLines = code.split("\n");
  return (
    <Code p={5} w="100%" contentEditable={false}>
      {codeLines.map((line, index) => (
        <span key={index}>
          {line} <br />
        </span>
      ))}
    </Code>
  );
};

export default APICodeblock;
