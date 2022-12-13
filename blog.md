# Modular Blockchains & Building on Fuel

TL;DR:
- Modular Blockchains present a new architectural design by decoupling the core functions of blockchains. This creates a new design where each layer can specialize for the function they provide.
- Fuel is building the fastest execution layer for the modular blockchain paradigm.
- Fuel is building the full suite of developer products, from a new language (Sway) to the fuel orchestrator (forc), to provide developers with the best experience.

I've been learning a lot about Modular Blockchains. As an app developer, the protocol layer is not something I spend most of my time researching. However, the need for scalability becomes very clear if you've made any transaction on Ethereum mainnet; the costs are high, and the transactions are slow, especially during peak times.

Modular Blockchains present a new paradigm to solve blockchain scalability. It's an architecture where the core functions of the blockchain are handled by separate, specialized layers which can unlock the scale required for mass adoption.

In this post, I want to talk about the following:
- Blockchains architectures: monolithic and modular, covering the what's and why's
- What's Fuel & why it's important for an app developer
- How to write a dApp on Fuel

---

## Introduction to Modular Blockchains

### Blockchain Scalability

Blockchain scalability is still a major issue. Blockchains are still slow and expensive compared to financial systems and other alternative architectures, and the number of transactions that can be processed in a given period is still limited. However, in recent years, several innovations have been developed that have the potential to improve scalability. These innovations are currently being explored by different teams.

In the context of Ethereum, various teams are exploring different solutions to improve scalability, such as Layer2s and Rollups. Some of these solutions have shown promise, while others have proven to be a dead end.

You may have heard of the Scalability Trilemma (aka Blockchain Trilemma), a term coined by Vitalik. It describes the trade-off between three key properties of a blockchain network: decentralization, scalability, and security.
- Decentralization: distribution of power among network participants
- Scalability: ability to handle large amounts of transactions
- Security: trustworthiness of the network

[add trilemma image]

The Scalability Trilemma states that it's only possible to get 2 out of the three properties with current technologies. Therefore, one feature can only be improved by sacrificing another. For example, a blockchain can prioritize Execution and make the transactions fast by having fewer nodes, increasing the cost to run a node and hence giving away from decentralization. (The Solana Blockchain can be given as an example).

There have been many approaches to improve scalability for a Traditional (Monolithic) blockchain where one should consider the blockchain trilemma. In short, a monolithic blockchain is an architecture where the blockchain's core functions are handled on the same layer, the Layer 1. 

This is where **Modular Blockchains** come in. It's an architecture design coined by Celestia and aims to solve scalability issues with a new approach. Modular blockchain architecture uses **modular components and features to build customizable, scalable, and flexible blockchain systems**.

Let's start with an overview of blockchain architectures and then move on to modular blockchains.

### Blockchain Architecture

At its core, a blockchain provides three functions: **Consensus**, **Execution** and **data availability**. We can think of these core functions as three modules or layers that make up the blockchain.

1. **Consensus**: Orders transactions, ensures that all nodes have the same state. The consensus protocol defines the rules on how transactions are ordered and how new blocks are added (e.g., PoW and PoS).
2. **Execution**: Processes transactions and changes the state of the blockchain (e.g., when Alice sends 1ETH to Bob, the state of the blockchain needs to be updated)
3. **[Data availability](https://coinmarketcap.com/alexandria/article/what-is-data-availability)**: Ensures data is available. When new blocks are added, the data must be available upon request.
4. *(Optional)* **Settlement**: Dispute resolution. This is how the blockchain determines valid transactions.

#### Monolithic Blockchains

Let's take a step back and talk about the traditional blockchain architecture, aka Monolithic Blockchains.

In the Monolithic blockchain architecture, the blockchain does everything. In other words, all three core components of the blockchain are handled on a single layer: Layer 1. Bitcoin and Solana are examples of monolithic blockchains.

In a Monolithic Blockchain, you must find resources that perform well on three core features. This means there will be a significant trade-off and/or very high hardware requirements, and the scalability trilemma comes into play. Different blockchains prioritize different core features; they optimize for the core feature(s) that are most important.

Alongside the high hardware requirements, monolithic blockchains present limited control and flexibility. All apps on that blockchain must follow the pre-determined rules/standards defined by layer 1. (E.g., the programming languages you can write your smart contract in.)

#### Modular Blockchains

A Modular Blockchain **breaks the blockchain down into smaller components and modules** that are **specialized components** for specific functions. Each layer only handles a few specialized tasks and must do it well.

[Image - modular vs. monolithic architecture]

Having separate layers provides **scalability** and **flexibility.**
- **Scalability**: Modular blockchains are more scalable because the resources are separated. Each module of the stack is **specialized for a specific function**. Therefore, the module can optimize the resources for the particular operation, and so this would increase efficiency.
- **Flexibility**: Modular blockchains are built from modules that can be updated and swapped out. You're not limited to a particular set of resources but can choose the layers that best fit your use case. (For example, in AWS, spinning up an EC2 machine, you have many different options. There are no one size fits; likewise, you can pick the execution layer that fits your use case.) This allows the creation of chains that are **tailored to specific needs** and allows developers to **quickly and easily make changes** to the blockchain without performing a full-scale upgrade.

###  Modular Blockchain Platforms: Ethereum, Celestia & Fuel

The Ethereum roadmap has been shifted to be modular, becoming [rollup-centric](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) & with sharding. [Rollups](https://ethereum.org/en/layer-2/#what-is-layer-2) are one of the best examples of modular architecture. A Rollup will do the execution and then leave consensus, data availability, and settlement for Layer 1. That's how a Rollup can scale exponentially compared to L1. This lowers the costs and leads to faster transactions. Ethereum sharding is a potential solution to the scalability problem of the Ethereum blockchain. It proposes to divide the network into smaller sub-networks called "shards", which can process transactions and store data independently. You can read more about Ethereum sharding over [here](https://ethereum.org/en/upgrades/sharding/).

[ethereum image?]

[Celestia](https://celestia.org/) is the first blockchain pioneer the modular blockchain architecture. It's the network that coined the term: Modular Blockchain. Simply put, **Celestia is minimal-layer 1 that provides data availability & consensus.** Celestia orders data and makes it available but does not execute the transactions. Instead, the Execution is outsourced to specialized execution layers like rollups. Celestia aims to solve the Data Availability problem that blockchains face. The Data Availability problem refers to the need to make sure all nodes in the network have access to the same complete and accurate data stored on the blockchain. This can become difficult to achieve, especially as the network grows in size and complexity. You can read more about Celestia & the data availability problem over here. 

[celestia image]

Another core layer in the Modular blockchain stack is the Execution Layer; that's where Fuel comes in. It's the more exciting part for me as an app developer since I can get hands-on and build some apps. We'll be talking about Fuel in the next section & move on to writing a smart contract in Sway and deploying it to Fuel.

---

## Getting started w/Fuel

Fuel is the fastest execution layer for modular blockchains. In the modular blockchain, the Execution, Data Availability and Consensus are separate layers. Fuel is the Execution layer. 

Fuel network is created by Fuel Labs, making the full suite of developer tools for building on Fuel, including the Sway programming language.

[fuel image]

#### Fuel Features

Let's talk about some of Fuel's core pillars:
1. **Parallel transaction execution**: Most blockchains are single-threaded, meaning that only one thread is executed at a certain instant. Fuel uses a UTXO model, which allows for parallel execution; this way, it can execute more threads simultaneously.
2. **Fuel Virtual Machine (FuelVM)**: Fuel has its own virtual machine to overcome some of the main drawbacks of EVM.
3. **Sway Language**: Fuel has its own domain-specific language called Sway, based on Rust. 

It's also important to mention the Fuel developer suite over here. Fuel has a full suite of developer tools to provide developers with all the resources to quickly build on the network. Force (Fuel orchestrator) is the developer toolchain for Fuel. 

---

## Writing a smart contract in Sway & Deploying to the Fuel Network

To recap: Sway is the domain-specific language for writing smart contracts on the FuelVM, inspired by Rust. Fuel is the execution environment (blockchain) we'll be deploying to.

The goal of this section is to:
- Provide an overview of the tools needed to build on Fuel
- Understand how to write and compile a smart contract in Sway

First, here are your go-to resources to learn more:
- Sway Book: https://fuellabs.github.io/sway/latest
- Rust SDK Book: https://fuellabs.github.io/fuels-rs/latest
- TypeScript SDK: https://github.com/FuelLabs/fuels-ts
 
## Tools:
- **Fuel Orchestrator(Forc)**: package manager for Sway.
- **Fuel wallet CLI** *please note that the wallet is under active development*
- **[Fuel Faucet](https://faucet-beta-1.fuel.network/)**

## Installation & Setup:

1. Install the Rust toolchain by following the steps [here](https://fuellabs.github.io/sway/v0.24.3/introduction/installation.html#dependencies)

2. The **Fuel toolchain** is required to compile Sway contracts and run them on the FuelVM. Install the Fuel toolchain by the command below; you can also find the steps [here](https://github.com/FuelLabs/fuelup)
```
$curl --proto '=https' --tlsv1.2 -sSf \
https://fuellabs.github.io/fuelup/fuelup-init.sh | sh
```
 - Toolchain is a new terminology; it refers to installing the Fuel Orchestrator(forc) and related plugins (like the fuel-core).
 - `fuelup` is the official package manager for Fuel that installs The Fuel Toolchain; you can read more on the [fuelup docs](https://fuellabs.github.io/fuelup/master/index.html) and find some [example commands](https://fuellabs.github.io/fuelup/master/examples.html)

Run the following to verify that toolchain was installed:
 ```
 fuelup --version
 forc --version
 fuel-core --version
 ```

3. The [beta-1 network](https://fuellabs.github.io/fuel-docs/master/networks/beta-1.html) is the first public Fuel testnet. Install the beta-1 toolchain by using the following command
```
run fuelup toolchain install beta-1 
``` 

Verify the toolchain by running the following: 
```
fuelup show
```
- You can also build your own toolchain with `fuelup`, more on it [here](https://fuellabs.github.io/fuelup/master/concepts/toolchains.html)

4. Setup a Fuel wallet & create your account by following the [steps](https://github.com/FuelLabs/forc-wallet#forc-wallet)
Make sure to save the seed phrase and your address. We'll be using the address to deploy the smart contract.

5. Get some TestNet tokens from the [faucet](https://faucet-beta-1.fuel.network/)  

## Create & Deploy a Smart Contract in Sway to Fuel

1. Create a smart contract project
```
forc new counter-contract
``` 
Here's what the project folder looks like:
```
.
├── Cargo.toml
├── Forc.toml
├── src
│   └── main.sw
└── tests
    └── harness.rs
```

- Forc.toml is the manifest file which defines the project metadata for Fuel
- Cargo.toml is the manifest file for Rust's package manager, cargo
- src/main.sw: sample smart contract
- tests folder contains the tests file

2. Let's change main.sw as below. I've added the comments in the code to explain the code. 

**TO_DO**

*For this project, we will not be looking into tests; you can use "`forc test` "to run tests on your smart contract.* 

3. In the project folder, run the command below to complile your contract:

```
forc build
``` 

You'll see new folders created in the project repo:
- **out:** A new folder contains the JSON files of the contract and the byte code.
- **Forc.lock**: Contains the information about your dependencies (similar to cargo.lock). This file should not be manually edited and is generated after the build.

4. We need a deployer account to deploy the contract; this is the account which we created earlier.

5. Time to deploy the contract. There are a few different options for deploying the smart contract:
- Use forc from the command line *We'll be using this option*
- [RustSDK](https://github.com/FuelLabs/fuels-rs#deploying-a-sway-contract)
- [TypeScriptSDK](https://github.com/FuelLabs/fuels-ts/#deploying-contracts)

```
forc deploy --url https://node-beta-1.fuel.network/graphql --gas-price TO_DO

```

---

Modular blockchains have the potential to provide exponential scalability to smart contract platforms, which is one of the most critical barriers to adoption. A second advantage unlocked by the modular architecture is flexibility. This can enable the creation of more efficient blockchain networks that can better meet the needs of users and applications.

I hope that this was helpful in getting a start on Fuel, more to come! Catch you on the next one! 
