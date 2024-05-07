import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { TextShell } from "../components/text";
import {
  API_BALANCE_BLURB,
  API_COLORIZE_BLURB,
  API_KEY_BLURB,
  BALANCE_API,
  COLORIZE_API,
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
      <Heading as="h1">Your API Key</Heading>
      <VStack alignItems="start" spacing={5}>
        <Text>{API_KEY_BLURB}</Text>
        <Flex pl={5} w="100%">
          <APIKey />
        </Flex>

        <Heading as="h2">Frequently Asked Questions</Heading>
        <APIQuestions />

        <Heading as="h2">API Documentation</Heading>
        <Text>{API_COLORIZE_BLURB}</Text>
        <APICodeblock code={COLORIZE_API} />
        <Text>{API_BALANCE_BLURB}</Text>
        <APICodeblock code={BALANCE_API} />

        <APIDisclaimerText />
      </VStack>
    </TextShell>
  );
};
export default API;
