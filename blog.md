# Modular Blockchains & Building on Fuel

TL;DR:
- Modular blockchains present a new architectural design by decoupling the core functions of blockchains. This creates a new design where each layer can specialize for the function they provide.
- Fuel is building the fastest execution layer for the modular blockchain paradigm.
- Fuel is building the full suite of developer products, from a new language (sway) to the fuel orchestrator (forc), to provide developers with the best experience.

I've been learning a lot about Modular Blockchains. As an app developer, the protocol layer is not something I spend most of my time researching; however, the need for scalability becomes very clear, especially if you've made any transaction on Ethereum mainnet. Unfortunately, the costs are high, and the transactions are slow, especially during peak times.

Modular Blockchains present a new paradigm to solve blockchain scalability. It's an architecture where the core functions of the blockchain are handled by separate, specialized layers which can unlock the scale required for mass adoption.

In this post, I want to talk about the following:
- Blockchains architectures: monolithic and modular, covering the what's and why's
- What's Fuel & why it's important for an app developer
- How to write a dApp on Fuel

---

## Introduction to Modular Blockchains

### Blockchain Scalability

Blockchain scalability is still a major issue. Blockchain networks are still slow and expensive compared to traditional payment and financial systems, and the number of transactions that can be processed in a given period of time is still limited. However, there have been a number of innovations over the last few years that have improved scalability and are being worked on by different teams. 

In the context of Ethereum, there are Layer2s, Side chains, Rollups and some other solutions that are being developed or some that are proved to be a dead-end. This is where Modular Blockchains come in. It's an architecture design coined by Celestia and aims to solve scalability issues with a new approach.

You may have heard of the Scalability Trilemma (aka Blockchain Trilemma), a term coined by Vitalik. The scalability trillema describes the trade-off between three key properties of a blockchain network - decentralization, scalability, and security.
- Decentralization: distribution of power among network participants
- Scalability: ability to handle large amounts of transactions
- Security: trustworthiness of the network
The Scalability Trilemma states that its only possible to get 2 out of the three properties with the current technologies. Therefore, one feature can only be improved by sacrificing another. For example, a blockchain can prioritize Execution and make the transactions fast by having fewer nodes so they'll reach Consensus more quickly. This would increase the throughput in the cost of decentralization. (The Solana Blockchain can be given as an example).

There are and have been many approaches to solve the blockchain trillema for a traditional (monolotic) blockchain, which means that all the core functions of the blockchain are handled on the same layer. That's where the modular blockchain archietcture comes in. The modular blockchain architure presents a new perspective to solve for blockchain scalabilty which splits the core functions of a blockchain to be their own layer insread of having all three properties on a unifed layer.

Let's first start with an overview of blockchain architectures and then move onto modular blockchains.

### Blockchain Architecture

At its core, a blockchain provides three functions: **Consensus**, **Execution** and **data availability**. So we can think of these core functions as three layers that make up the blockchain.

1. **Consensus**: Orders transactions, ensures that all nodes have the same state. The consensus protocol defines the rules on how transactions are ordered and how new blocks are added (eg, PoW and PoS).
2. **Execution**: Processes transactions and changes the state of the blockchain (eg, when Alice sends 1ETH to Bob, the state of the blockchain needs to be updated)
3. **[Data availability](https://coinmarketcap.com/alexandria/article/what-is-data-availability)**: Ensures data is available. When new blocks are added, the data must be available upon request.
4. *(Optional)* **Settlement**: Dispute resolution. This is how the blockchain determines valid transactions.

#### Monolithic Blockchains

Let's take a step back and talk about the traditional blockchain architecture, aka Monolithic Blockchains.

In the traditional blockchain architecture, the blockchain does everything. In other words, all three core components of the blockchain are handled in a single layer: Layer 1. Bitcoin and Solana are examples of monolithic blockchains.

In a monolithic blockchain, you must find resources that perform well on all three core features. This means there will be a significant trade-off and/or very high hardware requirements. Different blockchains prioritize different core features, so they optimize for the core feature(s) that are most important.

Alongside the high hardware requirements, monolithic blockchains present limited control and flexibility. All apps must follow the pre-determined rules/standards defined by layer 1. E.g., the programming languages you can write your smart contract in.

#### Modular Blockchains

A modular blockchain focuses on **breaking the blockchain down into smaller components and modules** that are specialized layer(s) for specific core functions. Each layer only handles a few specialized tasks and must do it well.

[image - modular vs. monolithic architecture]

Having separate layers provides **scalability** and **flexibility** to the blockchain.
- **Scalability**: Modular blockchains are more scalable because resources are separated. Each module of the stack is **specialized for a specific function**. Therefore, the module can optimize the resources for the particular operation, and so this would increase efficiency.
- **Flexibility**: Modular blockchains are built from a set of modules that can be updated and swapped out. You're not limited to a particular set of resources but can choose the layers that best fit your use case. (For example, in AWS, spinning up an EC2 machine, you have many different options. There are no one size fits; likewise, you can pick the execution layer that fits your use case.) This allows to create chains that are **tailored to specific needs** as well as well as allowing developers to **quickly and easily make changes** to the blockchain without performing a full-scale upgrade.

Modular blockchain architecture is similar to how virtual machines and cloud computing changed traditional web architecture. Instead of being limited by the resources of your own machine, now you can leverage other resources to scale up. As Nader puts it in his [post](https://nader.substack.com/p/blockchain-modularity-a-mental-model):

> Instead of deploying your application to the same blockchain as everyone else, you can deploy your own chain while still leveraging the same consensus layer so it can also share block space and security.

###  Modular Blockchain Platforms: Ethereum, Celestia & Fuel

The Ethereum roadmap has been shifted to be modular, becoming [rollup-centric](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) and with sharding. [Rollups](https://ethereum.org/en/layer-2/#what-is-layer-2) are one of the best examples. A rollup will do the Execution and then leave the Consensus, data availability, and settlement for Layer 1. That's how a Rollup can scale exponentially compared to L1. In the end, this is reflected by users as low-cost and faster transactions. Ethereum sharding is another modular approach that's been researched and worked on. Sharding is a method to distribute data across multiple databases. You can read more about Ethereum sharding over [here](https://ethereum.org/en/upgrades/sharding/).

[Celestia](https://celestia.org/) is the first blockchain pioneering the modular blockchain architecture. It's a minimal-layer 1 that provides data availability and Consensus. Celestia orders data and makes it available but does not execute the transactions. Instead, the Execution is outsourced to specialized execution layers like rollups. Celestia aims to solve the Data availability problem that blockchains face. The data availability problem arises when a node in the network is unable to access the data on the blockchain. I'll not be going deep into Celestia or the data availability problem. However, there are great resources from some giga-brains, which you can find below.

Another core layer is the execution layer; that's where Fuel comes in. It's the more exciting part for me as an app developer since I can get hands-on and build apps. We'll be talking about Fuel in the next section and start building.

---

## Getting started w/Fuel

Fuel is the fastest execution layer for modular blockchains. In the modular blockchain, the Execution, data availability and Consensus are separate layers, and Fuel is the execution layer. Fuel network is created by Fuel Labs who is also creating the full suite of developer tools for building on Fuel including the Sway programming langauge.


#### Fuel Features

Let's talk about some of Fuel's core pillars:
1. **Parallel transaction execution**: Most blockchains are single-threaded, meaning that only one thread is executed simultaneously. Fuel uses a UTXO model, which allows for parallel Execution; this way, it can execute more threads simultaneously.
2. **Fuel Virtual Machine (FuelVM)**: Fuel has its own virtual machine to overcome some of the main drawbacks of EVM.
3. **Sway Language**: Fuel has its own domain-specific language called Sway, which is based on Rust. Force(Fuel orchestrator) is the developer toolchain for Fuel. It has a full suite of developer tools to provide developers with all the resources to quickly build on the network.

---

## Writing a smart contract in Sway & Deploying to the Fuel Network

Sway is the domain-specific language for writing smart contracts on the FuelVM, inspired by Rust. Fuel is the execution enviornment(blockchain) we'll be deploying to.

The goal of this section is to:
- Provide an overview of the tools needed to build on Fuel
- Understand how to write and complile a smart contract in Sway
- Interact with the a smart contract on Fuel with the Fuel Wallet

First, here are your go-to resources to learn more:
- Sway Book: https://fuellabs.github.io/sway/latest
- Rust SDK Book: https://fuellabs.github.io/fuels-rs/latest
- TypeScript SDK: https://github.com/FuelLabs/fuels-ts
 
## Tools:
- **Fuel Orchestrator(Forc)**: package manager for Sway.
- **Fuel wallet CLI**: *please note that the wallet is under active development*
- **[Fuel Faucet](https://faucet-beta-1.fuel.network/)**

## Installation & Setup:

1. Install the Rust toolchain by following the steps [here](https://fuellabs.github.io/sway/v0.24.3/introduction/installation.html#dependencies)

2. The **Fuel toolchain** is required to compile Sway contracts and run them on the FuelVM. Install the Fuel toolchain by the command below, you can also find the steps [here](https://github.com/FuelLabs/fuelup)
```
$curl --proto '=https' --tlsv1.2 -sSf \
https://fuellabs.github.io/fuelup/fuelup-init.sh | sh
```
 - Toolchain is a new terminology, it referes to an installation of the Fuel Orchestrator(forc) along with related plugins (like the fuel-core).
 - `fuelup` is the official package manager for Fuel that installs The Fuel Toolchain, you can read more on the [fuelup docs](https://fuellabs.github.io/fuelup/master/index.html) and find some [example commands](https://fuellabs.github.io/fuelup/master/examples.html)

Run the following to verify that toolchain was installed:
 ```
 fuelup --version
 forc --version
 fuel-core --version
 ```

3. The [beta-1 network](https://fuellabs.github.io/fuel-docs/master/networks/beta-1.html) is the first public Fuel testnet. Install the beta-1 toolchain by the following command
```
run fuelup toolchain install beta-1 
``` 

Verify the toolchain by running the following: 
```
fuelup show
```
- You can also build your own toolchain with fuelup, more on it [here](https://fuellabs.github.io/fuelup/master/concepts/toolchains.html)

4. Setup a fuel wallet and create your account by following the [steps](https://github.com/FuelLabs/forc-wallet#forc-wallet)
Make sure to save the seed phrase and your address. We’ll be using the address to deploy the smart contract.

5. Get some testnet tokens from the [faucet](https://faucet-beta-1.fuel.network/)  

## Create & Deploy a Smart Contract in Sway to Fuel

1. Create a project folder
```
mkdir fuel-contract
``` 
2. Create the smart contract
```
forc new counter-contract
``` 
- Forc.toml is the manifest file which defines the project metadata  
- src/main.sw: sample smart contract 

3. Let’s change main.sw as below. I’ve added the comments in the code to explain the code. TO_DO 

4. In your fuel-contract folder run the command to build your contract:
```
forc build
``` 
You’ll see a new folder called ‘out’ which contains the JSON folders for the contract and the byte code.

5. Time to deploy the contract. The deployer account will be the account which we created earlier.
forc deploy --url https://node-beta-1.fuel.network/graphql --gas-price TO_DO

---

Modular blockchains promise to provide exponential scalability to smart contract platforms. However, alongside scalability, one of the most critical barriers to adoption, a second advantage is flexibility.

Hope that this was helpful! Catch you on the next one! 
