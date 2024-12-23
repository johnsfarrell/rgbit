import { Link } from "@chakra-ui/react";
import { ACTIVE_HOVER } from "../../utils/animations";
import { useState } from "react";
import MenuArrow from "./MenuArrow";

interface MenuButtonProps {
  text: string;
  link: string;
  isActive: boolean;
}

const MenuButton = ({ text, link, isActive }: MenuButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  const isExternal = link.startsWith("http");

  return (
    <Link
      fontWeight="900"
      p="10px 20px"
      href={link}
      color="gray.700"
      transition="all 0.2s"
      _hover={{ textDecor: "underline", ...ACTIVE_HOVER }}
      display="flex"
      alignItems="center"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      // textDecor={isActive ? "underline" : "none"}
    >
      {text} {isExternal && <MenuArrow hover={isHover} />}
    </Link>
  );
};

export default MenuButton;
