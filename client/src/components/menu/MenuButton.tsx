import { Link } from "@chakra-ui/react";
import { ACTIVE_HOVER } from "../../utils/animations";

interface MenuButtonProps {
  text: string;
  link: string;
  isHighlighted: boolean;
}

const MenuButton = ({ text, link, isHighlighted }: MenuButtonProps) => {
  const isExternal = link.startsWith("http");
  return (
    <Link
      fontWeight="900"
      p="10px 20px"
      href={link}
      color="gray.700"
      textDecor={isHighlighted ? "underline" : "none"}
      transition="all 0.2s"
      _hover={ACTIVE_HOVER}
    >
      {text} {isExternal && <>&#8599;&#xFE0E;</>}
    </Link>
  );
};

export default MenuButton;
