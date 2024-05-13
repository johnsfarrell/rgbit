import { useToast } from "@chakra-ui/react";
import Dropzone, { FileRejection } from "react-dropzone";
import { imageHasColor } from "../../utils/image";
import UploadBox from "./UploadBox";
import {
  Props,
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../../utils/constants";
import { FAILED_IMAGE_TOAST, FILE_REJECTED_TOAST } from "../../utils/toasts";

const UploadDropbox = ({ props }: Props) => {
  const { setFile, onOpen, setHasColor } = props;
  const toast = useToast();

  const dropAccepted = async (files: File[]) => {
    if (files.length === 0) return;

    try {
      setHasColor(await imageHasColor(files[0]));
    } catch (e: any) {
      toast(FAILED_IMAGE_TOAST);
      return;
    }

    setFile(files[0]);
    onOpen();
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
