import { Button, ComponentWithAs, Icon, IconProps } from "@chakra-ui/react";

interface ColorizeButtonProps {
  isColorized: boolean;
  onClick: () => void;
  icon: ComponentWithAs<"svg", IconProps>;
}

const ColorizeButton = ({
  isColorized,
  onClick,
  icon
}: ColorizeButtonProps) => {
  return (
    <Button
      colorScheme="blackAlpha"
      size="xs"
      onClick={isColorized ? onClick : undefined}
      transition="opacity 0.5s 0.5s, background 0.1s"
      opacity={isColorized ? 1 : 0}
      cursor={isColorized ? "pointer" : "default"}
    >
      <Icon as={icon} />
    </Button>
  );
};

export default ColorizeButton;
