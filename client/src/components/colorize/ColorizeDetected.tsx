import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { COLOR_DECTED_BLURB } from "../../utils/desc";
import { ACTIVE_HOVER } from "../../utils/animations";

interface ColorDetectedProps {
  props: {
    colorIsOpen: boolean;
    colorOnClose: () => void;
    colorRef: React.MutableRefObject<null>;
    handleRestore: () => void;
  };
}

const ColorizeDetected = ({ props }: ColorDetectedProps) => {
  const { colorIsOpen, colorOnClose, colorRef, handleRestore } = props;

  return (
    <AlertDialog
      isOpen={colorIsOpen}
      leastDestructiveRef={colorRef}
      onClose={colorOnClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontFamily="DM Sans" fontWeight={900}>
            color already detected!
          </AlertDialogHeader>

          <AlertDialogBody>{COLOR_DECTED_BLURB}</AlertDialogBody>

          <AlertDialogFooter gap={3}>
            <Button ref={colorRef} onClick={colorOnClose} _hover={ACTIVE_HOVER}>
              cancel
            </Button>
            <Button
              colorScheme="yellow"
              onClick={handleRestore}
              _hover={ACTIVE_HOVER}
            >
              colorize
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ColorizeDetected;
