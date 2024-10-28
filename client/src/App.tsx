import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { cookieAPI } from "./utils/cookie";
import { API, Home, ImageView, Terms } from "./pages";
import { AboutResearchToast } from "./components/about";
import { Menu, MenuTitle } from "./components/menu";
import { Footer } from "./components/footer";
import { theme } from "./utils/theme";

export const App = () => {
  const getHash = () => {
    let hash = window.location.hash.split("?")[0];
    if (hash.includes("=")) hash = hash.split("=")[0];
    return hash;
  };

  const [hashtag, setHashtag] = useState<string>(getHash());

  useEffect(() => {
    cookieAPI();

    const handleHashChange = () => {
      window.scrollTo(0, 0);
      setHashtag(getHash());
    };

    window.onhashchange = handleHashChange;

    return () => {
      window.onhashchange = null;
    };
  }, []);

  const Page = useMemo(() => {
    const RouteComponent =
      {
        "": Home,
        "#": Home,
        "#tos": Terms,
        "#api": API,
        "#image": ImageView,
      }[hashtag] || Home;
    return <RouteComponent />;
  }, [hashtag]);

  return (
    <ChakraProvider theme={theme}>
      <AboutResearchToast />
      <MenuTitle />
      <Menu hashtag={hashtag} />
      {Page}
      <Footer />
    </ChakraProvider>
  );
};
