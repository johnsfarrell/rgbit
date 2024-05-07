import { Center, Heading, Link } from "@chakra-ui/react";
import { TextShell } from "../components/text";
import { PAGE_NOT_FOUND } from "../utils/desc";

/**
 * Lost page
 *
 * @description 404 page, displayed when a user goes to a non-existent page
 *
 * @category Pages
 *
 * @returns {JSX.Element} Lost page
 */
const Lost = () => {
  return (
    <TextShell isCentered>
      <Center flexDir="column">
        <Heading fontFamily="mono" fontSize="9em">
          404
        </Heading>
        <Heading as="h1">{PAGE_NOT_FOUND}</Heading>
        <Link mt="10vh" href="#">
          &larr; Go back home
        </Link>
      </Center>
    </TextShell>
  );
};

export default Lost;
