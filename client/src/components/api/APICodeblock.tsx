import { Code } from "@chakra-ui/react";

const APICodeblock = ({ code }: { code: string }) => {
  const codeLines = code.split("\n");
  return (
    <Code p={5} rounded="md" ml={{ base: 0, sm: 5 }} contentEditable={false}>
      {codeLines.map((line, index) => (
        <span key={index}>
          {line} <br />
        </span>
      ))}
    </Code>
  );
};

export default APICodeblock;
