import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="text-lime-800">
      <Head>
        <title>MyReads</title>
        <meta
          name="description"
          content="Manage and track your books with MyReads!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="bg-green-600/70 text-emerald-900 flex items-center p-6">
          <hgroup>
            <div className="w-5/12">
              <h1 className="text-4xl font-semibold my-4">
                Made for books readers
              </h1>
              <h2 className="text-2xl font-semibold my-4">
                Manage and track your books digitally
              </h2>
              <h3 className="text-xl my-4">
                With MyReads, you can categories your books based on their
                reading status and genre using our shelves, create shelves based
                on your needs with no limitations
              </h3>
            </div>
          </hgroup>
          <div>
            img
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
