import { Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { OPEN_CLOSE } from "../../utils/animations";
import { RESEARCH_TOAST_HEADLINE } from "../../utils/desc";
import { ICON_PATH } from "../../utils/constants";

const AboutResearchToast = () => {
  return (
    <Link href="/img/icons/pdf.png">
      <Button
        top="-20vh"
        animation={OPEN_CLOSE}
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        display={{ base: "none", md: "block" }}
      >
        <Flex gap={3}>
          <Text>🎉</Text>
          <Text textTransform="capitalize">{RESEARCH_TOAST_HEADLINE}</Text>
          <Image h="19px" alt="research pdf" src={ICON_PATH + "pdf.png"} />
        </Flex>
      </Button>
    </Link>
  );
};

export default AboutResearchToast;
