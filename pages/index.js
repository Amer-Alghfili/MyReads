import { Box, chakra } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/main-page/Hero";
import Services from "../components/main-page/Services";

export default function Home() {
  return (
    <Box bgColor="#F2F6FF" minH="100vh" color="#454545">
      <Head>
        <title>MyReads</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Header />
      <div className="root">
        <chakra.section p={{ base: "2em", md: "4em" }}>
          <Hero />
        </chakra.section>
        <chakra.main p={{ base: "2em", md: "4em" }}>
          <div id="services" className="double-container">
            <Services />
          </div>
        </chakra.main>
      </div>
      <Footer />
    </Box>
  );
}
