import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export default function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    styles: {
      global: {
        html: {
          fontSize: { base: "calc(0.2em + 1vw)", "2xl": "1em" },
          scrollBehavior: "smooth",
        },
        "*": {
          fontSize: "inherit",
        },
        ".double-container": {
          maxW: { base: "100%", "2xl": "1440px" },
          m: "auto",
        },
        ".root": {
          minH: {
            base: "calc(100vh - (2.49375rem + 4rem) - (1.5rem + 6rem) - 6rem) !important",
            md: "calc(100vh - (2.7rem + 8rem) - (1.5rem + 6rem) - 6rem) !important",
          },
        },
      },
    },
    fonts: {
      heading: `'Nunito', sans-serif`,
      body: `'Nunito', sans-serif`,
    },
  });

  const Fonts = () => (
    <Global
      styles={`
      @import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Montserrat:ital,wght@0,100;0,400;1,100&family=Nunito:wght@600&family=Titillium+Web&display=swap');
      `}
    />
  );

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
