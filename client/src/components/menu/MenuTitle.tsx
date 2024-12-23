import { Box, Link } from "@chakra-ui/react";
import { ACTIVE_HOVER, HUE_ROTATE } from "../../utils/animations";
import { PORTFOLIO_URL } from "../../utils/constants";
import { useState } from "react";

const MenuTitle = () => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      as="h1"
      position="absolute"
      display={{ base: "none", sm: "flex" }}
      animation={HUE_ROTATE}
      p="10px 20px"
      transition="all 0.2s"
      _hover={{ cursor: "pointer", ...ACTIVE_HOVER }}
      fontFamily="Reddit Sans"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      gap={hover ? 1 : 0}
    >
      <Link
        href="/"
        fontWeight={900}
        bgGradient="linear(125deg, #a7271e, #a18f1f, #519519)"
        bgClip="text"
        color="transparent"
        animation={HUE_ROTATE}
        _hover={{
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 1,
            width: "100%",
            height: "0.1em",
            bgGradient: "linear(125deg, #a7271e, #a18f1f, #519519)"
          }
        }}
      >
        RGBIT
      </Link>
      <Box display="inline" opacity={hover ? 0 : 1} transition="opacity 0.1s">
        .
      </Box>
      <Link href={PORTFOLIO_URL} fontWeight={600} letterSpacing={-1}>
        johnfarrell.io
      </Link>
    </Box>
  );
};

export default MenuTitle;
