import { Box } from "@chakra-ui/react";
import { MenuArrow } from "../menu";
import { useState } from "react";

interface UploadBoxProps {
  isDragActive: boolean;
  file?: File;
}

const UploadBox = ({ isDragActive, file }: UploadBoxProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Box
      borderRadius={{ base: "none", md: "lg" }}
      bg={isDragActive ? "#f4f4f4" : "#fcfcfc"}
      letterSpacing={isDragActive ? "-0.5px" : "0px"}
      transform={isDragActive ? "scale(1.05)" : "scale(1)"}
      border="2px solid rgb(240, 240, 240)"
      padding={150}
      aspectRatio={2}
      h="45vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      id="dropbox-area"
      transition="all 0.2s"
      _hover={{
        filter: "brightness(0.975)",
        cursor: file ? "default" : "pointer",
        letterSpacing: "-0.5px",
        transform: "scale(1.05)"
      }}
      fontFamily="Reddit Sans"
      fontWeight={800}
      color="#a9a9a9"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      opacity={!file ? 1 : 0}
    >
      Upload Photo To Restore Color <MenuArrow hover={isHover} />
    </Box>
  );
};

export default UploadBox;
