import { useToast } from "@chakra-ui/react";
import {
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { getKey } from "../../utils/cookie";
import { COPY_TOAST } from "../../utils/toasts";
import { CopyIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { generateAPIKey } from "../../utils/key";

const APIKey = () => {
  const [key, setKey] = useState<string | undefined>("...");
  const toast = useToast();

  const handleCopy = () => {
    if (!key) return;
    navigator.clipboard.writeText(key);
    toast(COPY_TOAST);
  };

  useEffect(() => {
    const apiKey = getKey();
    if (apiKey) setKey(apiKey);
    else generateAPIKey().then(({ key }) => setKey(key));
  }, []);

  return (
    <InputGroup fontFamily="monospace" maxW={500}>
      <InputLeftAddon>key=</InputLeftAddon>
      <Input type="text" value={key} isTruncated={true} readOnly />
      <InputRightElement>
        <Button onClick={handleCopy} border="1px solid #e2e8f0" roundedLeft={0}>
          <CopyIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default APIKey;
