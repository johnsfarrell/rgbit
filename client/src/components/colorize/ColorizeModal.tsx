import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  Skeleton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { colorizePost } from "../../utils/api";
import APIDisclaimerText from "../api/APIDisclaimerText";
import { Props } from "../../utils/constants";
import {
  API_LIMIT_TOAST,
  LOW_BALANCE_TOAST,
  RESTORE_ERROR_TOAST,
  VERIFICATION_ERROR_TOAST,
} from "../../utils/toasts";
import { ACTIVE_HOVER } from "../../utils/animations";

const ColorizeModal = ({ props }: Props) => {
  const { isOpen, onClose, file } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  const handleOnClose = () => {
    if (isLoading) return;
    onClose();
  };

  const handleRestore = async () => {
    setIsLoading(true);

    const { status, redirect } = await colorizePost(file);
    if (status === 200) window.location.href = redirect;
    if (status === 402) toast(LOW_BALANCE_TOAST);
    if (status === 403) toast(VERIFICATION_ERROR_TOAST);
    if (status === 429) toast(API_LIMIT_TOAST);
    if (status === 500 || status === 400) toast(RESTORE_ERROR_TOAST);

    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} size="fit-content">
      <ModalOverlay display="flex" alignItems="center" justifyContent="center">
        <Spinner color="white" size="lg" hidden={!!file} />
      </ModalOverlay>
      <ModalContent w="fit-content">
        <Skeleton hidden={!file} isLoaded={!!file}>
          <ModalBody p="1.5em 1.5em 0.5em 1.5em">
            <Image
              src={file && URL.createObjectURL(file)}
              alt={file && file.name}
              maxH="60vh"
              minW={250}
              rounded="md"
            />
          </ModalBody>

          <ModalFooter justifyContent="center" flexDir="column" gap={2}>
            <Button
              onClick={handleRestore}
              isLoading={isLoading}
              colorScheme="purple"
              _hover={ACTIVE_HOVER}
            >
              Restore Color
            </Button>
            <APIDisclaimerText customText="By clicking above, you agree to our " />
          </ModalFooter>
          <Progress size="sm" isIndeterminate={isLoading} roundedBottom="md" />
        </Skeleton>
      </ModalContent>
    </Modal>
  );
};

export default ColorizeModal;
