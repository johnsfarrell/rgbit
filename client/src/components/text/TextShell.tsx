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
        minH="calc(100vh - 4em)" // 4em is the height of the footer
        maxW={800}
        css={isCentered && center}
      >
        {children}
      </Box>
    </Center>
  );
};

export default TextShell;
