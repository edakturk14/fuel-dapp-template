import { useEffect, useState } from "react";
import { ContractAbi__factory } from "../contracts";
import { BN } from "fuels";
import { PageHeader } from "../components/PageHeader";
import { PageFooter } from "../components/PageFooter";
import { ResourcesLinks } from "../components/ResourcesLinks";

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

  useEffect(() => {
    setTimeout(() => {
      checkConnection();
      setIsLoadingTx(false);
    }, 200);
    if (connected) {
      const getCounterValue = async () => {
        const wallet = await window.fuel.getWallet(account);
        const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
        const { value } = await contract.functions.counter().get();
        setCounter(Number(value));
      };
      getCounterValue();
    }
  }, [account, connected]);

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

  async function checkConnection() {
    const isConnected = await window.fuel?.isConnected();
    if (isConnected) {
      const accounts = await window.fuel.accounts();
      setAccount(accounts[0]);
      setConnected(true);
    }
  }

  async function incrementCounter() {
    const wallet = await window.fuel.getWallet(account);
    const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
    let data: { value: BN };
    try {
      data = await contract.functions
        .increment()
        .txParams({ gasPrice: 1 })
        .call();
      await contract.functions.increment().txParams({ gasPrice: 1 }).call();
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
              {errorMessage && (
                <div className="alert alert-error max-w-sm mt-4">
                  <div>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}
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
