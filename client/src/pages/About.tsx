import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TextShell } from "../components/text";
import { ABOUTS } from "../utils/desc";

const About = () => {
  return (
    <TextShell>
      {ABOUTS.map(({ header, blurb, content, Component }, key) => {
        return (
          <Box key={key}>
            <Heading as="h1">{header}</Heading>
            <Text>{blurb}</Text>
            <Flex flexWrap="wrap" justifyContent="center" p={5}>
              {content.map((props, key) => (
                <Component {...props} key={key} />
              ))}
            </Flex>
          </Box>
        );
      })}
    </TextShell>
  );
};

export default About;
