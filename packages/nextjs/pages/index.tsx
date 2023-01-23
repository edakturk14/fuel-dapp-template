import { useEffect, useState } from "react";
import Image from "next/image";
import { ContractAbi__factory } from "../contracts";
import { Wallet } from "fuels";

// ToDo. Move
const WALLET_SECRET =
  "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
const CONTRACT_ID =
  "0x3edb96c23766b8504caaff042994efa18460e7ba27f60191394a6bcf5be8d7d8";
const wallet = Wallet.fromPrivateKey(WALLET_SECRET);
const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);

export default function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const getCounterValue = async () => {
      const { value } = await contract.functions.counter().get();
      setCounter(Number(value));
    };
    getCounterValue();
  }, []);

  const incrementCounter = async () => {
    const { value } = await contract.functions.increment().call();
    // const { value } = await contract.functions.count().get();
    setCounter(Number(value));
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

        <p>Current counter value: {counter}</p>
        <button className="mt-4 btn btn-primary" onClick={incrementCounter}>
          Increment Counter
        </button>
      </main>
    </div>
  );
}
