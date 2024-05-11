import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { fetchImage } from "../utils/api";
import {
  ACTIVE_HOVER,
  GALLERY_ACTIONS_OPEN,
  IMAGE_VIEW_OPEN,
} from "../utils/animations";
import { TextShell } from "../components/text";
import { DownloadIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

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
  interface Image {
    original: string;
    colored: string;
  }
  const [image, setImage] = useState<Image | null>(null);

  const [showOriginal, setShowOriginal] = useState(false);

  useEffect(() => {
    async function loadImage() {
      try {
        const id = window.location.hash.slice(7); // remove #image=
        const { colored, original } = await fetchImage(id);
        setImage({ original, colored });
      } catch (e) {
        window.location.hash = "#";
      }
    }

    loadImage();
  }, []);

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image?.colored;
    link.download = "colorized.png";
    link.click();
    window.location.href = image?.colored;
  };

  const toggleOriginal = () => setShowOriginal((prev) => !prev);

  return (
    <TextShell isCentered>
      <Center h={{ base: "70vh", md: "78vh" }}>
        {image ? (
          <Tooltip label={`Click to toggle color!`} openDelay={500} hasArrow>
            <Image
              maxH="100%"
              shadow="xl"
              rounded="md"
              src={image.colored}
              filter={showOriginal ? "grayscale(100%)" : "none"}
              alt="colorized image"
              onClick={toggleOriginal}
              cursor="pointer"
              transition="all 1s ease"
              _hover={{
                transform: "scale(1.01)",
                shadow: "2xl",
              }}
              animation={IMAGE_VIEW_OPEN}
            />
          </Tooltip>
        ) : (
          <Spinner size="xl" />
        )}
      </Center>
      <Box
        pos="absolute"
        left="50%"
        transform="translateX(-50%)"
        bottom={5}
        opacity={image ? 1 : 0}
        transition="all 0.2s ease-in-out"
        animation={GALLERY_ACTIONS_OPEN}
      >
        <HStack>
          <Tooltip label="Toggle image color" hasArrow>
            <Button onClick={toggleOriginal} _hover={ACTIVE_HOVER}>
              {showOriginal ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </Tooltip>
          <Tooltip label="Download colorized image" hasArrow>
            <Button onClick={handleDownload} _hover={ACTIVE_HOVER}>
              <DownloadIcon />
            </Button>
          </Tooltip>
        </HStack>
      </Box>
    </TextShell>
  );
};

export default ImageView;
