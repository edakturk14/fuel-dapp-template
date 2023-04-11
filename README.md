# Fuel dApp Template ⛽🌴

The Fuel dApp Template is a developer-friendly starter kit for quickly building decentralized applications on the Fuel network! This template is built using NextJS, TypeScript, Tailwind CSS, Forc and Sway.

- Out-of-the-box local toolchain & wallet setup
- Easily deploy your smart contract in Sway to your local toolchain or the Fuel Beta-3 testnet
- Customizable frontend built using Tailwind CSS

[📹 Demo](https://www.youtube.com/watch?v=XwaAJEnnVcE&ab_channel=edatweets)
[📜 Blog Post](https://eda.hashnode.dev/building-decentralized-applications-on-fuel)

<img width="1398" alt="Screen Shot 2023-04-07 at 16 56 48" src="https://user-images.githubusercontent.com/22100698/230620996-9264f3d4-7e89-45ec-a3b3-8f05443982ba.png">

## Contents

- [Requirements](#requirements)
- [Quickstart](#Quickstart)
  * [Installation](#Installation)
  * [Getting started](#Getting-started)
  * [Local Deployments](#Local-Deployments)
  * [Testnet Deployments](#Testnet-Deployments)
- [Modular Blockchains & Fuel](#Modular-Blockchains-&-Fuel)
  * [Modular Blockchains](#Modular-Blockchains)
  * [Fuel](#Fuel)
- [Contributing](#Contributing)

## Requirements

Before using the Fuel dApp Template, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) v16.15.0 or newer
- [Yarn](https://www.npmjs.com/package/yarn)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Rust, Cargo and Forc (explained in the installation section)

## QuickStart

### Installation

To install the template, follow these steps:

1. Install the **Rust toolchain** by following the steps [here](https://fuellabs.github.io/sway/v0.24.3/introduction/installation.html#dependencies). Rust is used to build the Sway smart contracts used in the Fuel dApp template.

2. The **Fuel toolchain** is required to compile Sway contracts & run them on the FuelVM. Install the Fuel toolchain by the command below; you can also find the steps [here](https://github.com/FuelLabs/fuelup)

```sh
curl --proto '=https' --tlsv1.2 -sSf https://install.fuel.network/fuelup-init.sh | sh
```

3. Install the beta-3 network toolchain to test and deploy smart contracts using the following command:
    `fuelup toolchain install beta-3`

4. Install the Fuel Browser Wallet by following the steps [here](https://wallet.fuel.network/docs/install/).

### Getting Started

Clone this repo and install dependencies:
```
git clone https://github.com/edakturk14/fuel-starter-kit.git
cd fuel-starter-kit
yarn install
```

### Local Deployments

To deploy the template locally, follow these steps:

1. Start the Fuel chain locally
```
yarn fuel:chain
```

2. Deploy the example contract locally by running the following command:
```
yarn fuel:deploy:local
```
This will deploy an example smart contract to your local Fuel chain. Take note of the contract ID displayed in the terminal to use in later steps.

3. Update the Contract ID on `.env.development` in the NextJS folder. This is necessary so that the frontend can communicate with the deployed smart contract.
```
# The target contract you want to interact with
NEXT_PUBLIC_CONTRACT_ID=<YOUR_CONTRACT_ID>
```

4. Start your app and visit http://localhost:3000
```
yarn next:start
```

5. To interact with the smart contract, you need to add the local network to your Fuel Browser Wallet. Open your Fuel Browser Wallet extension and click "Add new network." Input a name and the URL: `http://127.0.0.1:4000/graphql`.

6. Get one of the Accounts private keys that were displayed when you started your localtoolchain, these accounts have the local funds by default. On your Fuel Wallet navigate to Accounts and then click "Add from private key."

If all goes well you should be able to connect your wallet to website, have a wallet with testnet funds and you can start incrementing the counter.

### Testnet Deployments

To deploy the template to the Fuel Beta-3 testnet, follow these steps:

1. For a testnet deployment, you'll need a tesnet account. To generate a testnet wallet, follow the steps [here](https://fuellabs.github.io/fuel-docs/master/developer-quickstart.html#deploy-the-contract)

2. Deploy the example contract to the Fuel Beta-3 testnet
```
yarn fuel:deploy:testnet
```

This will deploy the example smart contract to the Beta-3 network. The command will prompt you to sign the transaction, which you can do using Forc.

To get a signature, open a another terminal and use the following command to generate a signature:

```
forc-wallet account <account_index> sign tx-id <transaction_id>
```

Copy the signature from the previous terminal and paste it into your current terminal window. Then, press enter to execute the signature.

If everything goes well, the contract will be deployed to the testnet, and you'll see the contract ID and block number displayed on the terminal.

3. Update `.env.development` in the nextjs folder.
  - NEXT_PUBLIC_NETWORK=testnet
  - NEXT_PUBLIC_WALLET_SECRET (you can use the same account used for the deployment. Get the secret with `forc wallet export --account-index 0`)
  - NEXT_PUBLIC_CONTRACT_ID (you will need to add `0x` in the beginning of the contract-id)

4. Start your app & visit http://localhost:3000
```
yarn next:start
```

5.  Connect your Fuel Browser wallet to the Beta-3 Network and get some Testnet tokens from [the faucet](https://faucet-beta-3.fuel.network/). To ensure that your wallet is connected to the Beta-3 Network you can check the network settings, the URL should be: `https://beta-3.fuel.network/graphql`

Ready to use! Go ahead and make a transaction to increment counter.

## Modular Blockchains & Fuel

You can checkout this [blog post](https://eda.hashnode.dev/modular-blockchains-getting-started-with-fuel) for an intro to Modular Blockchains and Getting started w/Fuel.

### Modular Blockchains

Modular blockchains feature an architecture that separates the blockchain into smaller, specialized modules. This approach allows developers to create customizable, scalable, and flexible blockchain systems by combining modules in various configurations, much like building with Lego blocks. With distinct layers, modular blockchains offer improved scalability and flexibility. Each module's resources are optimized for specific operations, enhancing efficiency and scalability.

### Fuel

Fuel is building fastest Execution Layer for the modular blockchain architecture.

Fuel also offers a comprehensive suite of developer tools and resources, focused on providing the best possible developer experience, including the Sway the programming language and Fuel orchestrator (Forc) which is the toolchain.

Fuel offers several key features that set it apart from other blockchain platforms. One of its standout features is its own Virtual Machine, the FuelVM, which is designed to address the limitations of the EVM. Additionally, Fuel's UTXO model enables parallel transaction execution, allowing it to execute multiple threads simultaneously. Finally, Fuel's modular execution layer provides the flexibility to be deployed in a variety of settings, allowing developers to choose the data availability that best suits their use case.

## Contributing

We welcome contributions to Fuel dApp Template ⛽🌴!

Please see [CONTRIBUTING.MD](https://github.com/edakturk14/fuel-dapp-template/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Fuel dApp Template.
