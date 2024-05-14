import { Flex } from "@chakra-ui/react";
import MenuButton from "./MenuButton";
import { MENU_ITEMS } from "../../utils/constants";

interface MenuProps {
  hashtag: string;
}

const Menu = ({ hashtag }: MenuProps) => {
  const isDesktop = window.innerWidth > 600;

  return (
    <Flex
      position="absolute"
      transform={{
        base: "translateX(50%)",
        sm: "none",
      }}
      right={{ base: "50%", sm: 0 }}
      w="max-content"
    >
      {MENU_ITEMS.filter(({ text }) => isDesktop || text !== "api").map(
        ({ text, link }) => {
          return (
            <MenuButton
              key={text}
              text={text}
              link={link}
              isHighlighted={link.replace("#", "") === hashtag.replace("#", "")}
            />
          );
        }
      )}
    </Flex>
  );
};

export default Menu;
