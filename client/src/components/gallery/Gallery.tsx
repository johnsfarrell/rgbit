import { HStack } from "@chakra-ui/react";
import GalleryImage from "./GalleryImage";
import { GALLERY_IMAGES } from "../../utils/constants";
import { useEffect, useState } from "react";
import { getRandomElements } from "../../utils/image";
import { GALLERY_SCROLL } from "../../utils/animations";

interface GalleryProps {
  props: {
    hide?: boolean;
    setFile: (file: File | undefined) => Promise<boolean>;
    onOpen: () => void;
    file?: File;
  };
}

const Gallery = ({ props }: GalleryProps) => {
  const { hide, setFile, onOpen, file } = props;

  const [images, setImages] = useState<string[]>([]);

  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    const shuffledImages = getRandomElements(GALLERY_IMAGES);
    setImages([...shuffledImages, ...shuffledImages]);
  }, []);

  return (
    <HStack
      w="max-content"
      justify="space-evenly"
      height={hide ? "50px" : "100px"}
      align="flex-start"
      animation={GALLERY_SCROLL}
      style={{
        animationPlayState: hover ? "paused" : "running"
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      gap={0}
      transition="all 0.2s"
      opacity={!file ? 1 : 0}
    >
      {!hide &&
        images &&
        images.map((img: string, idx) => (
          <GalleryImage
            key={idx}
            src={img}
            setFile={setFile}
            onOpen={onOpen}
            file={file}
          />
        ))}
    </HStack>
  );
};

export default Gallery;
