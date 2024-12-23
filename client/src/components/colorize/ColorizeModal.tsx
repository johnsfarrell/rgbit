import { Box, Button, Image, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import APIDisclaimerText from "../api/APIDisclaimerText";
import { Props } from "../../utils/constants";
import { MenuArrow } from "../menu";
import {
  API_LIMIT_TOAST,
  LOW_BALANCE_TOAST,
  RESTORE_ERROR_TOAST,
  VERIFICATION_ERROR_TOAST
} from "../../utils/toasts";
import { colorizePost } from "../../utils/api";

const ColorizeModal = ({ props }: Props) => {
  const { file, setFile } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | undefined>(file);
  const [isColorized, setIsColorized] = useState(false);
  const toast = useToast();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setCurrentFile(file);
  }, [file]);

  const handleRestore = async () => {
    setIsLoading(true);

    const { status } = await colorizePost(file);

    if (status === 200) {
      setIsColorized(true);
      setCurrentFile(file);
    } else if (status === 402) toast(LOW_BALANCE_TOAST);
    else if (status === 403) toast(VERIFICATION_ERROR_TOAST);
    else if (status === 429) toast(API_LIMIT_TOAST);
    else if (status >= 400) toast(RESTORE_ERROR_TOAST);

    setIsLoading(false);
  };

  const clearFiles = () => {
    setFile(undefined);
    setCurrentFile(undefined);
    setIsColorized(false);
  };

  return (
    <>
      <Image
        src={currentFile && URL.createObjectURL(currentFile)}
        alt={currentFile ? currentFile.name : ""}
        maxH="60vh"
        minW={250}
        rounded="md"
        position="absolute"
        transition="filter 1s ease, opacity 0.5s ease, transform 0.3s ease"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        filter={isColorized ? "none" : "grayscale(100%)"}
        opacity={currentFile ? 1 : 0}
        zIndex={2}
      />

      <Button
        onClick={isColorized ? clearFiles : handleRestore}
        isLoading={isLoading}
        colorScheme="purple"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        pos="absolute"
        left="50%"
        bottom={20}
        opacity={file ? 1 : 0}
        transition="0.3s all"
        transform="translateX(-50%)"
        zIndex={2}
      >
        {isColorized ? "Return Home" : "Restore Color"}
        <MenuArrow hover={hover} />
      </Button>

      {currentFile && !isColorized && (
        <Box pos="absolute" left="50%" transform="translateX(-50%)" bottom={2}>
          <APIDisclaimerText customText="By clicking above, you agree to the " />
        </Box>
      )}
    </>
  );
};

export default ColorizeModal;
