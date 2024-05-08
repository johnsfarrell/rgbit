import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { FAQS } from "../../utils/desc";

const APIQuestions = () => {
  return (
    <Accordion allowMultiple w="100%">
      {FAQS.map(({ question, answer }, index) => {
        return (
          <AccordionItem key={index}>
            <AccordionButton justifyContent="space-between">
              {question}
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <OrderedList pl={4} spacing={4}>
                {answer.map((step, index) => (
                  <ListItem key={index}>{step}</ListItem>
                ))}
              </OrderedList>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default APIQuestions;
