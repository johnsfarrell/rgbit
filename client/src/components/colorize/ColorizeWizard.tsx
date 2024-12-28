import { Box, Button, Image, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import APIDisclaimerText from "../api/APIDisclaimerText";
import { Props } from "../../utils/constants";
import {
  API_LIMIT_TOAST,
  LOW_BALANCE_TOAST,
  RESTORE_ERROR_TOAST,
  VERIFICATION_ERROR_TOAST
} from "../../utils/toasts";
import { colorizePost, fetchImage } from "../../utils/api";
import { AtSignIcon, DownloadIcon } from "@chakra-ui/icons";
import ColorizeButton from "./ColorizeButton";

const ColorizeWizard = ({ props }: Props) => {
  const { file, setFile } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [fileSrc, setFileSrc] = useState<string | undefined>(
    file && URL.createObjectURL(file)
  );
  const [isColorized, setIsColorized] = useState(false);
  const toast = useToast();

  const [redirect, setRedirect] = useState<string>("");

  useEffect(() => {
    setFileSrc(file && URL.createObjectURL(file));
  }, [file]);

  const handleRestore = async () => {
    setIsLoading(true);

    const { status, imageId, redirect } = await colorizePost(file);

    if (status === 200) {
      const { colored } = await fetchImage(imageId);
      setRedirect(redirect);
      setFileSrc(colored);
      setIsColorized(true);
    } else if (status === 402) toast(LOW_BALANCE_TOAST);
    else if (status === 403) toast(VERIFICATION_ERROR_TOAST);
    else if (status === 429) toast(API_LIMIT_TOAST);
    else if (status >= 400) toast(RESTORE_ERROR_TOAST);

    setIsLoading(false);
  };

  const clearFiles = () => {
    setFile(undefined);
    setFileSrc(undefined);
    setIsColorized(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileSrc || "";
    link.download = "colorized.png";
    link.click();
  };

  const handleShare = () => window.open(redirect, "_blank");

  return (
    <>
      <Box
        position="absolute"
        left="50%"
        top="50%"
        transform={`translate(-50%, -50%) ${isColorized ? "scale(1.1)" : ""}`}
        transition="filter 1s ease, opacity 0.5s ease, transform 1s ease"
        filter={isColorized ? "none" : "grayscale(100%)"}
        opacity={fileSrc ? 1 : 0}
        zIndex={2}
        display="inline-block"
        rounded="md"
        shadow="lg"
      >
        <Image
          src={fileSrc}
          alt={fileSrc}
          maxH="50vh"
          maxW="85vw"
          rounded="md"
          pointerEvents="none"
        />

        <Box
          position="absolute"
          top="2"
          right="2"
          display="flex"
          flexDir="row"
          gap={1}
        >
          {[
            { onClick: handleDownload, icon: DownloadIcon },
            { onClick: handleShare, icon: AtSignIcon }
          ].map(({ onClick, icon }) => (
            <ColorizeButton
              onClick={onClick}
              icon={icon}
              isColorized={isColorized}
            />
          ))}
        </Box>
      </Box>

      <Button
        onClick={isColorized ? clearFiles : handleRestore}
        isLoading={isLoading}
        colorScheme="blue"
        pos="absolute"
        left="50%"
        bottom={20}
        opacity={file && !isColorized ? 1 : 0}
        transition="0.3s all"
        transform="translateX(-50%)"
        zIndex={file ? 3 : -1}
      >
        Restore Color
      </Button>

      {fileSrc && !isColorized && (
        <Box pos="absolute" left="50%" transform="translateX(-50%)" bottom={2}>
          <APIDisclaimerText customText="By clicking above, you agree to the " />
        </Box>
      )}
    </>
  );
};

export default ColorizeWizard;
