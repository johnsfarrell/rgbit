import { Image, Tooltip } from "@chakra-ui/react";
import { GALLERY_TRY_IMAGE } from "../../utils/desc";
import { urlToFile } from "../../utils/image";
import { GALLERY_OPEN } from "../../utils/animations";

interface GalleryImageProps {
  src: string;
  setFile: (image: File | undefined) => Promise<boolean>;
  onOpen: () => void;
}

const GalleryImage = ({ src, setFile, onOpen }: GalleryImageProps) => {
  const handleImageClick = async () => {
    setFile(undefined);
    const img = await urlToFile(src, src);
    onOpen();
    await setFile(img);
  };

  return (
    <Tooltip label={GALLERY_TRY_IMAGE} hasArrow>
      <Image
        src={src}
        key={src}
        alt={src}
        rounded="md"
        objectFit="cover"
        w={{ base: "27.5%", sm: "150px" }}
        h={{ base: "75px", sm: "100px" }}
        transition="all 0.1s"
        _hover={{
          cursor: "pointer",
          opacity: 0.75,
          transform: "scale(1.05)",
        }}
        animation={GALLERY_OPEN}
        onClick={handleImageClick}
      />
    </Tooltip>
  );
};

export default GalleryImage;
