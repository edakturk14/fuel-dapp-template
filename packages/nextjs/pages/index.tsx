import { useEffect, useState } from "react";
import { ContractAbi, ContractAbi__factory } from "../contracts";
import { BN } from "fuels";
import { PageHeader } from "../components/PageHeader";
import { PageFooter } from "../components/PageFooter";
import { ResourcesLinks } from "../components/ResourcesLinks";

/*
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

//const WALLET_SECRET = process.env.NEXT_PUBLIC_WALLET_SECRET ?? "";
*/

declare global {
  interface Window {
    fuel?: any;
  }
}

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID ?? "";

export default function Home() {
  const [counter, setCounter] = useState<number>(0);
  const [connected, setConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");
  const [isLoadingTx, setIsLoadingTx] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  async function connect() {
    if (window.fuel) {
      try {
        await window.fuel.connect();
        const accounts = await window.fuel.accounts();
        setAccount(accounts[0]);
        setConnected(true);
      } catch (err) {
        console.log("error connecting: ", err);
      }
    }
  }
  async function disconnect() {
    if (window.fuel && window.fuel.isConnected) {
      await window.fuel.disconnect();
      setAccount("");
      setConnected(false);
    }
  }

  async function incrementCounter() {
    const wallet = await window.fuel.getWallet(account);
    const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
    let data: { value: BN };
    console.log(contract);
    console.log(wallet);
    try {
      data = await contract.functions
        .increment()
        .txParams({ gasPrice: 1 })
        .call();
    } catch (e) {
      console.error("~~ increment counter tx error", e);
      // @ts-ignore
      const errorMsg = e?.response?.errors?.[0]?.message ?? "Unknown error";
      setErroMessage(errorMsg);
      return;
    }
    setCounter(Number(data.value));
    setIsLoadingTx(false);
    setErroMessage("");
  }

  return (
    <div className="px-8 flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex items-center flex-col py-16 flex-grow">
        <div className="flex items-center flex-col">
          {connected ? (
            <>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Interact with your Fuel Contract
              </h2>
              <p>Current counter value</p>
              <p className="text-4xl font-bold">{counter}</p>
              <button
                className={`mt-6 btn btn-primary ${
                  isLoadingTx ? "loading" : ""
                }`}
                onClick={incrementCounter}
              >
                Increment Counter
              </button>
              <button className="mt-6 btn btn-primary" onClick={disconnect}>
                Disconnect
              </button>
            </>
          ) : (
            <button className="mt-6 btn btn-primary" onClick={connect}>
              Connect
            </button>
          )}
        </div>

        <ResourcesLinks />
      </main>
      <PageFooter />
    </div>
  );
}
