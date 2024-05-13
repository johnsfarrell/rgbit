import { HStack } from "@chakra-ui/react";
import GalleryImage from "./GalleryImage";
import { GALLERY_IMAGES } from "../../utils/constants";
import { useEffect, useState } from "react";
import { getRandomElements } from "../../utils/image";

interface GalleryProps {
  props: {
    hide?: boolean;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    onOpen: () => void;
  };
}

const Gallery = ({ props }: GalleryProps) => {
  const { hide, setFile, onOpen } = props;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(getRandomElements(GALLERY_IMAGES, 3));
  }, []);

  return (
    <HStack w="100%" justify="space-evenly" height="100px" align="flex-start">
      {!hide &&
        images &&
        images.map((img: string) => (
          <GalleryImage key={img} src={img} setFile={setFile} onOpen={onOpen} />
        ))}
    </HStack>
  );
};

export default Gallery;
