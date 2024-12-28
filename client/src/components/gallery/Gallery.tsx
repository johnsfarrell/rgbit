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
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    const shuffledImages = getRandomElements(GALLERY_IMAGES);
    setImages([...shuffledImages, ...shuffledImages]);
  }, []);

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  const allImagesLoaded = loadedCount === images.length && images.length > 0;

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
      opacity={!file && allImagesLoaded ? 1 : 0}
      pointerEvents={!file && allImagesLoaded ? "all" : "none"}
    >
      {!hide &&
        images &&
        images.map((img: string, idx) => (
          <GalleryImage
            key={idx}
            src={img}
            onLoad={handleImageLoad}
            setFile={setFile}
            onOpen={onOpen}
            file={file}
          />
        ))}
    </HStack>
  );
};

export default Gallery;
