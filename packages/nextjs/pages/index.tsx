import Image from "next/image";

export default function Home() {
  return (
    <div className="px-8">
      <main className="flex items-center flex-col py-16">
        <h1 className="text-center my-12 text-4xl">
          <Image
            className="inline-block	pr-2"
            src="/logo.svg"
            alt="Fuel Logo"
            width={34}
            height={40}
          />
          Fuel App
        </h1>

        <button className="mt-4 btn btn-primary">Interact with Contract</button>
      </main>
    </div>
  );
}
