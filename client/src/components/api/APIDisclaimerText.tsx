import { Link, Text } from "@chakra-ui/react";

interface APIDisclaimerTextProps {
  customText?: string;
}

const APIDisclaimerText = ({ customText }: APIDisclaimerTextProps) => {
  return (
    <Text
      fontStyle="italic"
      fontSize="x-small"
      color="GrayText"
      w="max-content"
    >
      {customText || "By using this site's services and API, you agree to our "}
      <Link color="blue.500" href="#tos">
        terms of service
      </Link>
      .
    </Text>
  );
};

export default APIDisclaimerText;
