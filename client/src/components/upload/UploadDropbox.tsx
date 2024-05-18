import { useToast } from "@chakra-ui/react";
import Dropzone, { FileRejection } from "react-dropzone";
import { convertToJPEG, limitJPEGSize } from "../../utils/image";
import UploadBox from "./UploadBox";
import {
  Props,
  ACCEPTED_FILE_TYPES,
  FILE_RESIZE,
  MAX_FILE_SIZE,
} from "../../utils/constants";
import { FAILED_IMAGE_TOAST, FILE_REJECTED_TOAST } from "../../utils/toasts";

const UploadDropbox = ({ props }: Props) => {
  const { setFile, onOpen, onClose } = props;

  const toast = useToast();

  const dropAccepted = async (files: File[]) => {
    if (files.length === 0) return;
    setFile(undefined);
    onOpen();
    try {
      let image = files[0];
      image = await convertToJPEG(image);
      image = await limitJPEGSize(image, FILE_RESIZE);
      setFile(image);
    } catch (error) {
      toast(FAILED_IMAGE_TOAST);
      onClose();
    }
  };

  const dropRejected = (fileRejections: FileRejection[]) => {
    toast(FILE_REJECTED_TOAST);
  };

  return (
    <Dropzone
      onDropAccepted={dropAccepted}
      onDropRejected={dropRejected}
      maxSize={MAX_FILE_SIZE}
      accept={ACCEPTED_FILE_TYPES}
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <UploadBox isDragActive={isDragActive} />
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadDropbox;
