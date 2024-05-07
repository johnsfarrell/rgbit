import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { colorizePost } from "../../utils/api";
import APIDisclaimerText from "../api/APIDisclaimerText";
import ColorizeDetected from "./ColorizeDetected";
import { Props } from "../../utils/constants";
import { LOW_BALANCE_TOAST, RESTORE_ERROR_TOAST } from "../../utils/toasts";
import { ACTIVE_HOVER } from "../../utils/animations";
import Models from "./Models";

const ColorizeModal = ({ props }: Props) => {
  const { isOpen, onClose, file, hasColor, setHasColor } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const {
    isOpen: colorIsOpen,
    onOpen: colorOnOpen,
    onClose: colorOnClose,
  } = useDisclosure();

  const colorRef = useRef(null);

  const handleOnClose = () => {
    if (isLoading) return;
    setHasColor(false);
    onClose();
  };

  const handleRestore = async () => {
    colorOnClose();
    setIsLoading(true);

    try {
      const { status, redirect } = await colorizePost(file);
      if (status === 200) window.location.href = redirect;
    } catch (e: any) {
      const { status } = e.response;
      if (status === 402) toast(LOW_BALANCE_TOAST);
      if (status === 400) toast(RESTORE_ERROR_TOAST);
    }

    setIsLoading(false);
  };

  const colorProps = {
    colorIsOpen,
    colorOnClose,
    colorRef,
    handleRestore,
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOnClose} size="fit-content">
        <ModalOverlay />
        <ModalContent w="fit-content">
          <ModalBody p="1.5em 1.5em 0.5em 1.5em">
            <Image
              src={file && URL.createObjectURL(file)}
              alt={file && file.name}
              maxH="60vh"
              minW={250}
              filter={isLoading ? "grayscale(100%)" : ""}
              rounded="md"
              transition="filter 1s"
            />
          </ModalBody>

          <ModalFooter justifyContent="center" flexDir="column" gap={2}>
            <Flex justify="space-between" w="100%">
              <Models isHidden />
              <Button
                onClick={hasColor ? colorOnOpen : handleRestore}
                isLoading={isLoading}
                colorScheme="purple"
                _hover={ACTIVE_HOVER}
                justifyContent="center"
              >
                Restore Color {hasColor && <Text ml={2}>⚠️</Text>}
              </Button>
              <Models />
            </Flex>
            <APIDisclaimerText customText="By clicking above, you agree to our " />
          </ModalFooter>
          <Progress size="sm" isIndeterminate={isLoading} roundedBottom="md" />
        </ModalContent>
      </Modal>
      <ColorizeDetected props={colorProps} />
    </>
  );
};

export default ColorizeModal;
