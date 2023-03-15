import { useEffect, useState } from "react";
import { ContractAbi, ContractAbi__factory } from "../contracts";
import { BN, Wallet } from "fuels";
import { PageHeader } from "../components/PageHeader";
import { PageFooter } from "../components/PageFooter";

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
      data = await contract.functions
        .increment()
        .txParams({ gasPrice: 1 })
        .call();
    } catch (e) {
      console.error("~~ increment counter tx error", e);
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
    <div className="px-8 flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex items-center flex-col py-16">
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

        <h2 className="text-2xl font-bold text-primary mb-2">
          Interact with your Fuel Contract
        </h2>
        <p>Current counter value</p>
        <p className="text-4xl font-bold">{counter}</p>
        <button
          className={`mt-6 btn btn-primary ${isLoadingTx ? "loading" : ""}`}
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
      <PageFooter />
    </div>
  );
}
