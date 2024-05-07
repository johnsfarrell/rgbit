import { Flex } from "@chakra-ui/react";
import MenuButton from "./MenuButton";
import { menuItems } from "../../utils/constants";

interface MenuProps {
  hashtag: string;
}

const Menu = ({ hashtag }: MenuProps) => {
  return (
    <Flex
      position="absolute"
      transform={{
        base: "translateX(50%)",
        sm: "none",
      }}
      right={{ base: "50%", sm: 0 }}
    >
      {menuItems.map(({ text, link }) => {
        return (
          <MenuButton
            key={text}
            text={text}
            link={"#" + link}
            isHighlighted={link === hashtag.replace("#", "")}
          />
        );
      })}
    </Flex>
  );
};

export default Menu;
