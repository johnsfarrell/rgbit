import { Box, Center, css } from "@chakra-ui/react";

interface TextShellProps {
  children: React.ReactNode;
  isCentered?: boolean;
}

const TextShell = ({ children, isCentered }: TextShellProps) => {
  const center = css({
    display: "flex",
    justifyContent: "center"
  });

  return (
    <Center>
      <Box
        pt={20}
        pb={5}
        minH="100vh"
        maxW="min(800px, 90%)"
        css={isCentered && center}
      >
        {children}
      </Box>
    </Center>
  );
};

export default TextShell;
