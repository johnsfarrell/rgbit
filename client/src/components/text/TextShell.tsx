import { Box, css } from "@chakra-ui/react";

interface TextShellProps {
  children: React.ReactNode;
  isCentered?: boolean;
}

const TextShell = ({ children, isCentered }: TextShellProps) => {
  const center = css({
    display: "flex",
    justifyContent: "center",
  });

  return (
    <Box
      p={20}
      pb={10}
      minH="calc(100vh - 4em)" // 4em is the height of the footer
      css={isCentered && center}
    >
      {children}
    </Box>
  );
};

export default TextShell;
