import { Box, Center, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FILE_RESIZE, Injection } from "../utils/constants";
import { Gallery } from "../components/gallery";
import { ColorizeBalance, ColorizeWizard } from "../components/colorize";
import { UploadDropbox } from "../components/upload";
import Div100vh from "react-div-100vh";
import { convertToJPEG, grayscaleJPEG, limitJPEGSize } from "../utils/image";

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

  /** returns true if file set successfully, false otherwise */
  async function handleSetFile(file: File | undefined): Promise<boolean> {
    if (!file) {
      setFile(undefined);
      return true;
    }

    try {
      let image = file;
      image = await convertToJPEG(image);
      image = await limitJPEGSize(image, FILE_RESIZE);
      image = await grayscaleJPEG(image);
      setFile(image);
      return true;
    } catch (e) {
      return false;
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const injections: Injection = {
    file,
    setFile: handleSetFile,
    isOpen,
    onOpen,
    onClose
  };

  return (
    <Center
      w="100vw"
      overflow="hidden"
      // bg="radial-gradient(circle at 50% 50%, rgb(0,0,0,0), rgb(0, 0, 0, 0.25))"
    >
      <Div100vh>
        <Center h="100%" flexDir="column" maxW={600} gap={10}>
          <Box h="50px" />
          <UploadDropbox props={injections} />
          <Gallery props={injections} />
        </Center>

        <ColorizeWizard props={injections} />

        <ColorizeBalance props={injections} />
      </Div100vh>
    </Center>
  );
};

export default Home;
