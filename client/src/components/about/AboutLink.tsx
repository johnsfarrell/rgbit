import { Box, Card, Flex, Image, Link, Text } from "@chakra-ui/react";

interface AboutLinkProps {
  title: string;
  description: string;
  src: string;
  href: string;
}

const AboutLink = ({ title, description, src, href }: AboutLinkProps) => {
  return (
    <Link href={href} p={2} fontFamily="system-ui">
      <Card w={{ base: "xs", sm: "md" }}>
        <Flex alignItems="center" gap={10} p={5}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Text fontWeight={700}>{title}</Text>
              <Text>{description}</Text>
            </Box>
          </Flex>
          <Image h={10} alt="research pdf" src={src} />
        </Flex>
      </Card>
    </Link>
  );
};

export default AboutLink;
