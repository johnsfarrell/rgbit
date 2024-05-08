import { Image, Link } from "@chakra-ui/react";

interface AboutPosterProps {
  src: string;
  alt: string;
}

const AboutPoster = ({ src, alt }: AboutPosterProps) => {
  return (
    <Link href={src}>
      <Image
        p={4}
        rounded={"md"}
        transition="all 0.2s"
        boxShadow={"sm"}
        _hover={{ boxShadow: "md" }}
        src={src}
        alt={alt}
      />
    </Link>
  );
};

export default AboutPoster;
