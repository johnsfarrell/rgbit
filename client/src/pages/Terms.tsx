import { Heading, List, ListItem, Text } from "@chakra-ui/react";
import { TextShell } from "../components/text";
import { TERMS_AND_CONDITIONS } from "../utils/desc";

/**
 * Terms and Conditions page
 *
 * @category Pages
 *
 * @returns {JSX.Element} Terms and Conditions page
 */
const Terms = () => {
  return (
    <TextShell>
      {TERMS_AND_CONDITIONS.map(({ heading, text, list }, index) => (
        <div key={index}>
          <Heading textTransform="capitalize">{heading}</Heading>
          <Text>{text}</Text>
          <List styleType="disc" pl={5}>
            {list.map((item, index) => (
              <ListItem key={index}>{item}</ListItem>
            ))}
          </List>
        </div>
      ))}
    </TextShell>
  );
};

export default Terms;
