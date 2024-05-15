import { Box } from "@chakra-ui/react";

interface UploadBoxProps {
  isDragActive: boolean;
}

const UploadBox = ({ isDragActive }: UploadBoxProps) => (
  <Box
    borderRadius={{ base: "none", md: "lg" }}
    bg={isDragActive ? "#f4f4f4" : "#fcfcfc"}
    letterSpacing={isDragActive ? "-0.5px" : "0px"}
    transform={isDragActive ? "scale(1.05)" : "scale(1)"}
    border="2.5px dashed #d9d9d9"
    padding={150}
    aspectRatio={2}
    h="45vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    id="dropbox-area"
    transition="all 0.2s"
    _hover={{
      bg: "#f4f4f4",
      cursor: "pointer",
      letterSpacing: "-0.5px",
      transform: "scale(1.05)",
    }}
    fontFamily="DM Sans"
    fontWeight={900}
    color="#a9a9a9"
  >
    upload photo to restore color
  </Box>
);

export default UploadBox;
