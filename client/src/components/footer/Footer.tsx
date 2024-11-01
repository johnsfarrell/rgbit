import { Flex, HStack } from "@chakra-ui/react";
import FooterLink from "./FooterLink";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Flex
      position="absolute"
      h="4em"
      w="100vw"
      justifyContent={{ base: "center", sm: "space-between" }}
      bg="gray.100"
      p={5}
      fontSize="sm"
      color="gray.500"
    >
      <HStack gap={8}>
        <FooterLink hideSmall={true} href={process.env.PUBLIC_URL}>
          RGBIT
        </FooterLink>
        <FooterLink href="#tos">terms</FooterLink>
        <FooterLink href="https://github.com/johnsfarrell/rgbit">
          github
        </FooterLink>
      </HStack>
      <FooterLink hideSmall={true}>🎨 {year}</FooterLink>
    </Flex>
  );
};

export default Footer;
