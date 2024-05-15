import { Center, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Injection } from "../utils/constants";
import { Gallery } from "../components/gallery";
import { ColorizeBalance, ColorizeModal } from "../components/colorize";
import { UploadDropbox } from "../components/upload";
import Div100vh from "react-div-100vh";

/**
 * Home page
 *
 * @description Home page for the application
 *
 * @category Pages
 *
 * @returns {JSX.Element} Home page
 */
const Home = () => {
  const [file, setFile] = useState<File | undefined>();
  const [hasColor, setHasColor] = useState<boolean | undefined>(undefined);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const injections: Injection = {
    file,
    setFile,
    isOpen,
    onOpen,
    onClose,
    hasColor,
    setHasColor,
  };

  return (
    <Center w="100vw" overflow="hidden">
      <Div100vh>
        <Center h="100%" flexDir="column" maxW={600} gap={5}>
          <Gallery props={{ hide: true, ...injections }} />
          <UploadDropbox props={injections} />
          <Gallery props={injections} />
        </Center>
        <ColorizeModal props={injections} />
        <ColorizeBalance props={injections} />
      </Div100vh>
    </Center>
  );
};

export default Home;
