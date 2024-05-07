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
        <FooterLink hideSmall={true} href="/">
          rgbaddies
        </FooterLink>
        <FooterLink href="#about">about</FooterLink>
        <FooterLink href="#tos">terms</FooterLink>
        <FooterLink href="https://github.com">github</FooterLink>
      </HStack>
      <FooterLink hideSmall={true}>🎨 {year}</FooterLink>
    </Flex>
  );
};

export default Footer;
