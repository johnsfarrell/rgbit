import { HStack } from "@chakra-ui/react";
import GalleryImage from "./GalleryImage";
import { imgGallery } from "../../utils/constants";

interface GalleryProps {
  props: {
    hide?: boolean;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    onOpen: () => void;
  };
}

const Gallery = ({ props }: GalleryProps) => {
  const { hide, setFile, onOpen } = props;
  return (
    <HStack w="100%" justify="space-evenly" height="100px" align="flex-start">
      {!hide &&
        imgGallery.map((img: string) => (
          <GalleryImage key={img} src={img} setFile={setFile} onOpen={onOpen} />
        ))}
    </HStack>
  );
};

export default Gallery;
