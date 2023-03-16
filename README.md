# Fuel dApp Template ⛽🌴

Fuel dApp Template is a developer-friendly starter kit that enables you to quickly build decentralized applications on the Fuel network! Built using NextJS, DaisyUI, Forc, Sway and Typescript.

https://user-images.githubusercontent.com/22100698/224391910-c9f99bcd-0362-4660-b313-5925b0843804.mp4

### Features
- Out-of-the-box local toolchain & wallet setup
- Easily deploy your smart contract in Sway to your local toolchain or the Fuel Beta-2 testnet
- Customizable frontend built using Tailwind CSS

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

Before starting to use the Fuel dApp Template, make sure you have the following requirements installed on your system:

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
The Fuel toolchain is required to compile Sway contracts and run them on the FuelVM.

3. The [beta-2 network](https://fuellabs.github.io/fuel-docs/master/networks/beta-1.html) is the second public Fuel testnet. Install the beta-2 toolchain by using the following command:
    `fuelup toolchain install beta-2`
It is used to test and deploy smart contracts.

4. Install the Fuel Wallet by following the steps [here](https://wallet.fuel.network/docs/install/).

5. Get some Testnet tokens from [the testnet faucet](https://faucet-beta-2.fuel.network/)

### Getting Started

Clone this repo & install dependencies:
```
git clone https://github.com/edakturk14/fuel-starter-kit.git
cd fuel-starter-kit
yarn install
```

### Local Deployments

To deploy the template locally, follow these steps:

1. Start the fuel chain locally
```
yarn fuel:chain
```
This will start the Fuel chain on your local machine.

2. Deploy the example contract locally by running the following command:
```
yarn fuel:deploy:local
```
This will deploy an example smart contract to your local Fuel chain. The contract ID will be displayed in the terminal, and you will need to save it for use in later steps.

3. Update the Contract ID on `.env.development` in the NextJS folder. This is necessary so that the frontend can communicate with the deployed smart contract.
```
# The target contract you want to interact with
NEXT_PUBLIC_CONTRACT_ID=<YOUR_CONTRACT_ID>
```

4. Start your app & visit http://localhost:3000
```
yarn next:start
```

5. To interact with the smart contract, you need to add the local network to your Fuel Browser Wallet. Open your Fuel Browser Wallet extension and click "Add new network." Input a name and the URL: `http://127.0.0.1:4000/graphql`.

### Testnet Deployments

To deploy the template to the Fuel Beta-2 testnet, follow these steps:

1. For a testnet deployment, you'll need a tesnet account. To generate a testnet wallet, follow the steps [here](https://fuellabs.github.io/fuel-docs/master/developer-quickstart.html#deploy-the-contract)

2. Deploy the example contract to the Fuel Beta-2 testnet
```
yarn fuel:deploy:testnet
```

This will deploy the example smart contract to the beta-2 network. The command will prompt you to sign the transaction, which you can do using Forc.

To get a signature, open a another terminal and use the following command to generate a signature:

```
forc-wallet sign TRANSACTION_ID ACCOUNT_INDEX
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

## Modular Blockchains & Fuel

### Modular Blockchains

A modular blockchain is a blockchain architecture that breaks down the blockchain into smaller modules, each specialized for certain functions. This approach allows developers to build customizable, scalable, and flexible blockchain systems by combining modules in various ways, similar to building with Lego blocks. With separate layers, modular blockchains provide scalability and flexibility. The resources in each module are optimized for a specific operation, leading to increased efficiency and improved scalability.

### Fuel

Fuel is building fastest Execution Layer for the modular blockchain architecture.

Fuel also offers a comprehensive suite of developer tools and resources, focused on providing the best possible developer experience, including the Sway the programming language and Fuel orchestrator (Forc) which is the toolchain.

Fuel offers several key features that set it apart from other blockchain platforms. One of its standout features is its own Virtual Machine, the FuelVM, which is designed to address the limitations of the EVM. Additionally, Fuel's UTXO model enables parallel transaction execution, allowing it to execute multiple threads simultaneously. Finally, Fuel's modular execution layer provides the flexibility to be deployed in a variety of settings, allowing developers to choose the data availability that best suits their use case.

## Contributing
We welcome contributions to Fuel dApp Template ⛽🌴!

Please see [CONTRIBUTING.MD](https://github.com/edakturk14/fuel-dapp-template/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Fuel dApp Template.