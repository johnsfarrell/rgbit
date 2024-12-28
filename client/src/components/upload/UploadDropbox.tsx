import { useToast } from "@chakra-ui/react";
import Dropzone, { FileRejection } from "react-dropzone";
import UploadBox from "./UploadBox";
import {
  Props,
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE
} from "../../utils/constants";
import { FAILED_IMAGE_TOAST, FILE_REJECTED_TOAST } from "../../utils/toasts";

const UploadDropbox = ({ props }: Props) => {
  const { setFile, onOpen, onClose } = props;

  const toast = useToast();

  const dropAccepted = async (files: File[]) => {
    if (files.length === 0) return;
    setFile(undefined);
    onOpen();
    const isSuccessful = await setFile(files[0]);
    if (!isSuccessful) {
      onClose();
      toast(FAILED_IMAGE_TOAST);
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
      disabled={props.file !== undefined}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <UploadBox isDragActive={isDragActive} file={props.file} />
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default UploadDropbox;
