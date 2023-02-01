import { useEffect, useState } from "react";
import Image from "next/image";
import { ContractAbi, ContractAbi__factory } from "../contracts";
import { BN, Wallet } from "fuels";

interface NetworkConfig {
  [key: string]: {
    provider: string;
  };
}
const AVAILABLE_NETWORKS: NetworkConfig = {
  localhost: {
    provider: "http://127.0.0.1:4000/graphql",
  },
  testnet: {
    provider: "https://node-beta-2.fuel.network/graphql",
  },
};

// Selected network
const selectedNetwork: keyof NetworkConfig =
  process.env.NEXT_PUBLIC_NETWORK ?? "localhost";
const network = AVAILABLE_NETWORKS[selectedNetwork];

const WALLET_SECRET = process.env.NEXT_PUBLIC_WALLET_SECRET ?? "";
// Handle error.
const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID ?? "";

let contract: ContractAbi;
try {
  const wallet = Wallet.fromPrivateKey(WALLET_SECRET, network.provider);
  contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
} catch (e) {
  console.log("Error", e);
}

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  useEffect(() => {
    const getCounterValue = async () => {
      const { value } = await contract.functions.counter().get();
      setCounter(Number(value));
    };

    if (!contract) return;
    getCounterValue();
  }, []);

  const incrementCounter = async () => {
    setIsLoadingTx(true);
    let data: { value: BN };
    try {
      data = await contract.functions.increment().call();
    } catch (e) {
      setIsLoadingTx(false);
      // @ts-ignore
      const errorMsg = e?.response?.errors?.[0]?.message ?? "Unknown error";
      setErroMessage(errorMsg);
      return;
    }
    setCounter(Number(data.value));
    setIsLoadingTx(false);
    setErroMessage("");
  };

  return (
    <div className="px-8">
      <main className="flex items-center flex-col py-16">
        <h1 className="text-center my-12 text-4xl">
          <Image
            className="inline-block pr-2"
            src="/logo.svg"
            alt="Fuel Logo"
            width={34}
            height={40}
          />
          Fuel App
        </h1>

        {!contract && (
          <div className="alert alert-error max-w-sm mb-4">
            <div>
              <span>
                Contract not connected. Make sure you have defined the right
                values on the <code>.env</code> file.
              </span>
            </div>
          </div>
        )}

        <p>Current counter value: {counter}</p>
        <button
          className={`mt-4 btn btn-primary ${isLoadingTx ? "loading" : ""}`}
          onClick={incrementCounter}
        >
          Increment Counter
        </button>

        {errorMessage && (
          <div className="alert alert-error max-w-sm mt-4">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
