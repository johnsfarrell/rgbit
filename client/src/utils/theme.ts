import { cssVar, extendTheme } from "@chakra-ui/react";

const $arrowBg = cssVar("popper-arrow-bg");

const TooltipConfig = {
  baseStyle: {
    bg: "gray.900",
    color: "white",
    px: 3,
    py: 2,
    [$arrowBg.variable]: "colors.gray.900",
  },
};

const ButtonConfig = {
  baseStyle: {
    transition: "all 0.1s",
    fontFamily: "DM Sans",
    textTransform: "lowercase",
  },
};

const LinkConfig = {
  baseStyle: {
    fontFamily: "DM Sans",
  },
};

const HeadingConfig = {
  baseStyle: {
    mt: 5,
    mb: 2,
    textTransform: "lowercase",
  },
  sizes: {
    xl: {
      fontSize: "xl",
    },
  },
};

const theme = extendTheme({
  components: {
    Tooltip: TooltipConfig,
    Button: ButtonConfig,
    Link: LinkConfig,
    Heading: HeadingConfig,
  },
  fonts: {
    heading: "DM Sans",
  },
});

export { theme };
