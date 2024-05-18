import { Box } from "@chakra-ui/react";
import { ACTIVE_HOVER, HUE_ROTATE } from "../../utils/animations";

const MenuTitle = () => {
  return (
    <a href={process.env.PUBLIC_URL}>
      <Box
        as="h1"
        position="absolute"
        display={{ base: "none", sm: "block" }}
        bgGradient="linear(125deg, #a7271e, #a18f1f, #519519)"
        bgClip="text"
        color="transparent"
        animation={HUE_ROTATE}
        fontWeight="900"
        p="10px 20px"
        transition="all 0.2s"
        _hover={{ cursor: "pointer", ...ACTIVE_HOVER }}
        textTransform="lowercase"
      >
        RGBit!
      </Box>
    </a>
  );
};

export default MenuTitle;
