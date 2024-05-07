import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { ACTIVE_HOVER } from "../../utils/animations";
import { SettingsIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Models = ({ isHidden }: { isHidden?: boolean }) => {
  const [value, setValue] = useState<string>("default");
  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button
          _hover={ACTIVE_HOVER}
          visibility={isHidden ? "hidden" : "unset"}
        >
          <SettingsIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Advanced (Models)</PopoverHeader>
        <PopoverBody>
          <RadioGroup onChange={handleChange} value={value}>
            <Stack direction="row">
              <Radio value="default">Default</Radio>
              <Radio value="rgbit">RGBIT</Radio>
              <Radio value="deoldify">DeOldify</Radio>
            </Stack>
          </RadioGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Models;
