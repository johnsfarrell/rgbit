import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { TextShell } from "../components/text";
import {
  API_DOCUMENTATION_CONTENT,
  API_DOCUMENTATION_HEADER,
  API_FAQ_HEADER,
  API_KEY_BLURB,
  API_KEY_HEADER,
} from "../utils/desc";
import {
  APICodeblock,
  APIDisclaimerText,
  APIKey,
  APIQuestions,
} from "../components/api";

/**
 * API page
 *
 * @description Displays the API key and documentation
 *
 * @category Pages
 *
 * @returns {JSX.Element} API page
 */
const API = () => {
  return (
    <TextShell>
      <Heading as="h1">{API_KEY_HEADER}</Heading>
      <VStack alignItems="start" spacing={5}>
        <Text>{API_KEY_BLURB}</Text>
        <Flex pl={5} w="100%">
          <APIKey />
        </Flex>

        <Heading as="h2">{API_FAQ_HEADER}</Heading>
        <APIQuestions />

        <Heading as="h2">{API_DOCUMENTATION_HEADER}</Heading>
        {API_DOCUMENTATION_CONTENT.map(({ heading, text, code }) => (
          <VStack key={heading} alignItems="start" spacing={3}>
            <Heading as="h3" fontSize="lg">
              {heading}
            </Heading>
            <Text>{text}</Text>
            <APICodeblock code={code} />
          </VStack>
        ))}

        <APIDisclaimerText />
      </VStack>
    </TextShell>
  );
};
export default API;
