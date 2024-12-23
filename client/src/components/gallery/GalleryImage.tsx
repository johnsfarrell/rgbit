import { Image, Tooltip } from "@chakra-ui/react";
import { GALLERY_TRY_IMAGE } from "../../utils/desc";
import { urlToFile } from "../../utils/image";
import { GALLERY_OPEN } from "../../utils/animations";

interface GalleryImageProps {
  src: string;
  setFile: (image: File | undefined) => Promise<boolean>;
  onOpen: () => void;
  file?: File;
}

const GalleryImage = ({ src, setFile, file }: GalleryImageProps) => {
  const handleImageClick = async () => {
    setFile(undefined);
    const img = await urlToFile(src, src);
    await setFile(img);
  };

  return (
    <Tooltip label={GALLERY_TRY_IMAGE} hasArrow isDisabled={!!file}>
      <Image
        src={src}
        key={src}
        alt={src}
        rounded="md"
        objectFit="cover"
        h={{ base: "75px", sm: "100px" }}
        transition="all 0.1s"
        opacity={0.75}
        _hover={{
          cursor: !file && "pointer",
          opacity: 0.95,
          transform: "scale(1.05)"
        }}
        animation={GALLERY_OPEN}
        onClick={!file ? handleImageClick : () => {}}
        mx={1}
      />
    </Tooltip>
  );
};

export default GalleryImage;
