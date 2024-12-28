import { useEffect, useState } from "react";
import { Box, Flex, Image, Spinner } from "@chakra-ui/react";
import { fetchImage } from "../utils/api";
import { TextShell } from "../components/text";
import { DownloadIcon } from "@chakra-ui/icons";
import { IMAGE_VIEW_OPEN } from "../utils/animations";
import { ColorizeButton } from "../components/colorize";

/**
 * View Image page
 *
 * @description Displays a single image in color or black and white
 *
 * @category Pages
 *
 * @returns {JSX.Element} View Image page
 */
const ImageView = () => {
  const [image, setImage] = useState<string | null>(null);

  const [isColorized, setIsColorized] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadImage() {
      setIsLoading(true);

      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        const id = window.location.hash.slice(7); // remove #image=
        const { colored } = await fetchImage(id);
        setImage(colored);

        await new Promise(resolve => setTimeout(resolve, 200));
        setIsColorized(true);
      } catch (e) {
        window.location.hash = "#";
      }

      setIsLoading(false);
    }

    loadImage();
  }, []);

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "colorized.png";
    link.click();
    window.location.href = image;
  };

  return (
    <TextShell isCentered>
      <Flex alignItems="center">
        {!isLoading ? (
          <Box
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%) scale(1.1)"
            transition="filter 1s ease, opacity 0.5s ease, transform 1s ease"
            animation={IMAGE_VIEW_OPEN}
            filter={isColorized ? "none" : "grayscale(100%)"}
            opacity={image ? 1 : 0}
            zIndex={2}
            display="inline-block"
            rounded="md"
            shadow="lg"
          >
            {image && (
              <Image
                src={image}
                alt={image}
                maxH="50vh"
                maxW="85vw"
                rounded="md"
              />
            )}

            <Box
              position="absolute"
              top="2"
              right="2"
              display="flex"
              flexDir="row"
              gap={1}
            >
              {[{ onClick: handleDownload, icon: DownloadIcon }].map(
                ({ onClick, icon }) => (
                  <ColorizeButton
                    onClick={onClick}
                    icon={icon}
                    isColorized={isColorized}
                  />
                )
              )}
            </Box>
          </Box>
        ) : (
          <Spinner />
        )}
      </Flex>
    </TextShell>
  );
};

export default ImageView;
