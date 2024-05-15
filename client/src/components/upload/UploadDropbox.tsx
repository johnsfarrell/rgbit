import { useToast } from "@chakra-ui/react";
import Dropzone, { FileRejection } from "react-dropzone";
import {
  convertToJPEG,
  imageHasColor,
  limitImageSize,
} from "../../utils/image";
import UploadBox from "./UploadBox";
import {
  Props,
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
  FILE_RESIZE,
} from "../../utils/constants";
import { FAILED_IMAGE_TOAST, FILE_REJECTED_TOAST } from "../../utils/toasts";

const UploadDropbox = ({ props }: Props) => {
  const { setFile, onOpen, setHasColor, onClose } = props;

  const toast = useToast();

  const dropAccepted = async (files: File[]) => {
    if (files.length === 0) return;

    onOpen();
    try {
      setFile(undefined);
      let image = await convertToJPEG(files[0]);
      image = await limitImageSize(image, FILE_RESIZE);
      setHasColor(await imageHasColor(image));
      setFile(image);
    } catch (e: any) {
      toast(FAILED_IMAGE_TOAST);
      onClose();
      return;
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
