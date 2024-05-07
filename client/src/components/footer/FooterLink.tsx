import { Link, Text } from "@chakra-ui/react";

interface FooterLinkProps {
  hideSmall?: boolean;
  href?: string;
  children: React.ReactNode;
}

const FooterLink = ({ hideSmall, href, children }: FooterLinkProps) => {
  return (
    <Text display={{ base: hideSmall ? "none" : "flex", sm: "flex" }}>
      {href ? <Link href={href}>{children}</Link> : <>{children}</>}
    </Text>
  );
};

export default FooterLink;
