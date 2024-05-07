import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TextShell } from "../components/text";
import { ABOUT_BLURB, TEAM_BLURB, RESOURCES, PROFILES } from "../utils/desc";
import { AboutLink, AboutProfile } from "../components/about";

const About = () => {
  return (
    <TextShell>
      <Heading as="h1">About rgbaddies</Heading>
      <Text>{ABOUT_BLURB}</Text>
      <Flex flexWrap="wrap" justifyContent="center" p={5}>
        {RESOURCES.map(({ title, description, src, href }) => (
          <AboutLink
            key={title}
            title={title}
            description={description}
            src={src}
            href={href}
          />
        ))}
      </Flex>

      <Heading>Team</Heading>
      <Text>{TEAM_BLURB}</Text>
      <Flex flexWrap="wrap" justifyContent="center" p={5}>
        {PROFILES.map((profile) => {
          return (
            <Box key={profile.name} p={2}>
              <AboutProfile {...profile} />
            </Box>
          );
        })}
      </Flex>

      <Heading>Research</Heading>
      <Text>TODO</Text>
    </TextShell>
  );
};

export default About;
