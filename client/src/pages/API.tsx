import { Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { TextShell } from "../components/text";
import {
  API_DOCUMENTATION_CONTENT,
  API_DOCUMENTATION_HEADER,
  API_FAQ_HEADER,
  API_KEY_BLURB,
  API_KEY_HEADER,
  API_LIMITATION_DESCRIPTION
} from "../utils/desc";
import {
  APICodeblock,
  APIDisclaimerText,
  APIKey,
  APIQuestions,
  APICounts,
  APIHeading
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
      <APIHeading text={API_KEY_HEADER} id="api-key" h="h1" />
      <VStack alignItems="start" spacing={5}>
        <Text>{API_KEY_BLURB}</Text>
        <Flex pl={1} w="100%">
          <APIKey />
        </Flex>

        <APIHeading text={API_FAQ_HEADER} id="faq" h="h2" />
        <APIQuestions />

        <APIHeading text={API_DOCUMENTATION_HEADER} id={"doc"} h="h2" />
        {API_DOCUMENTATION_CONTENT.map(({ heading, text, code }) => (
          <VStack key={heading} alignItems="start" spacing={3} maxW="100%">
            <APIHeading text={heading} id={heading} h="h2" />
            <Text>{text}</Text>
            <APICodeblock code={code} />
          </VStack>
        ))}

        <Text>{API_LIMITATION_DESCRIPTION}</Text>

        <Flex w="100%" mt={10}>
          <APIDisclaimerText />
          <Spacer />
          <APICounts />
        </Flex>
      </VStack>
    </TextShell>
  );
};
export default API;
