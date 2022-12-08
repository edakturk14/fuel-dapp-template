import Head from "next/head";

export default function Home() {
  return (
    <div className="px-8">
      <Head>
        <title>Fuel App</title>
        <meta name="description" content="Fuel app" />
      </Head>

      <main className="flex items-center flex-col py-16">
        <h1 className="text-center my-12 text-4xl">Fuel App</h1>

        <button className="mt-4 btn btn-primary">Interact with Contract</button>
      </main>
    </div>
  );
}
