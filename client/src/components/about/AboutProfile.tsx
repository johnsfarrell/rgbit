import { Avatar, Box, Button, Card, Flex, Link, Text } from "@chakra-ui/react";

interface AboutProfileProps {
  name: string;
  src: string;
  bio: string;
  linkedinUrl: string;
}

const Profile = ({ name, src, bio, linkedinUrl }: AboutProfileProps) => {
  return (
    <Card w={{ base: "xs", sm: "md" }} m={2}>
      <Flex alignItems="center" gap={10} p={5}>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name={name} src={src} />
          <Box>
            <Text fontWeight={700}>{name}</Text>
            <Text>{bio}</Text>
          </Box>
        </Flex>
        <Link href={linkedinUrl} isExternal={true}>
          <Button
            colorScheme="linkedin"
            fontWeight={900}
            fontSize="xx-large"
            aspectRatio={1}
          >
            in
          </Button>
        </Link>
      </Flex>
    </Card>
  );
};

export default Profile;
