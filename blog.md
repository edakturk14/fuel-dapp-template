# Modular Blockchains & Building on Fuel

TLDR:
- Modular blockchains present a new architectural design by decoupling the core functions of a blockchains. This creates a new design where each layer can specalize for the function they provide.
- Fuel is building the fastest executions layer for the modular blockchain paradigm.
- Fuel is building the full suite of developer products, from a new language (sway) to the fuel orcehctrator (forc), to provide developers the best experince.

I've been learning a lot about Modular Blockchains. As an app developer, the protocol layer is not something I spend most of my time researching; however, the need for scalability becomes very clear, especially if you've made any transaction on Ethereum mainnet. Unfortunately, the costs are high, and the transactions are slow, especially during peak times.

Modular Blockchains present a new paradigm to solve blockchain scalability. It's an architecture where the core functions of the blockchain are handled by separate, specialized layers which can unlock the scale required for mass adoption.

In this post I want to talk about:
- Blockchains architectures: monolithic and modular, covering the what's and why's
- Whats Fuel & why its important for an app developer
- How to write a dApp on Fuel

---

## Introduction to Modular Blockchains

### Blockchain Scalability

Blockchain scalability has been a huge discussion with different research teams and lots of resources going into it. In the context of Ethereum, there are Layer2s, Side chains, Rollups and some other solutions that are being developed or some that are proved to be a dead-end. This is where Modular Blockchains come in. It's an architecture design coined by Celestia and aims to solve scalability issues with a new approach.

You may have heard of the scalability trilemma (aka blockchain trilemma). The Scalability Trilemma mentions that the 3 properties that make a public blockchain desirable are scalability, decentralization and security, and that it is only possible to get 2 out of the three properties with the current technologies. Therefore, one feature can only be improved by sacrificing another. For example, a blockchain can prioritize execution and make the transactions fast by having fewer nodes so they'll reach consensus more quickly. This would increase the throughput in the cost of decentralization. (The Solana Blockchain can be given as an example).

Modular blockchains promise to provide exponential scalability to smart contract platforms. However, alongside scalability, one of the most important barriers to adoption, a second advantage is flexibility.

### Blockchain Architecture

In its core a blockchain provides 3 functions: **consensus**, **execution** and **data availability**. We can think of these core functions as 3 layers that make up the blockchain.

1. **Consensus**: Orders transactions, ensures that all nodes have the same state. The consensus protocol defines the rules on how transactions are ordered and how new blocks are added (example: PoW, PoS).
2. **Execution**: Processes transactions and changes the state of the blockchain (eg: when Alice sends 1ETH to Bob, the state of the blockchain needs to be updated)
3. **[Data availability](https://coinmarketcap.com/alexandria/article/what-is-data-availability)**: Ensures data is available. When new blocks are added, the data must be avaliable upon requests.
4. *(Optional)* **Settlement**: Dispute resolution. This is how the blockchain determines valid transactions.

#### Monolithic Blockchains

Let's first take a step back and talk about the traditional blockchain architecture, aka Monolithic Blockchains.

In the traditional blockchain architecture the blockchain does everything. In other words, all 3 core components of the blokchain are handled in a single layer: the Layer 1. Bitcoin and Solana are examples of monolithic blockchains.

Esentailly this means that in a monolotic blockchain, you need to find resources that perform well on all 3 core features. This means that there's going to be a significant trade-off and/or very high hardware requirements. Different blockchains prioritize different core features and so they optimize for the core feature(s) that's most important.

Alongside the high hardware requirements, monolotic blockchains present limited control and flexibility. All apps must follow the pre-determeined rules/standards defined by the layer1. Eg: the programming languages you can write your smart contract in.

#### Modular Blockchains

Contrasting to the monolithic architecture, in a modular blockchain there are distinct specialized layer(s) for the core fuctions. In other words, a modular blockchain outsources one or more of the core features to another chain. Each layer only handles a few specialized tasks, and they must do it well.

[image - modular vs. monolotic architecture]

Having seperate layers provides **scalability** and **flexibility** to the blockchain.
- **Scalability**: Modular blockchains are more scalable because resources are separated. Each layer of the stack is specialized for a specific function. The layer can optimize the resources for the specific function, and so this would increase efficiency.
- **Flexibility**: You're not limited to a particular set of resources but can choose the layers that best fit your use case. (For example, in AWS, spinning up an EC2 machine, you have many different options. There are no one size fits; likewise, you can pick the execution layer that fits your use case.)

Modular blockchain architecture is similar to how virtual machines and cloud computing changed traditional web architecture. Instead of being limited by the resources of your own machine, now you can leverage other resources to scale up. As Nader puts it in his [post](https://nader.substack.com/p/blockchain-modularity-a-mental-model):

> Instead of deploying your application to the same blockchain as everyone else, you can deploy your own chain while still leveraging the same consensus layer so it can also share block space and security.

###  Modular Blockchain Platforms: Ethereum, Celestia & Fuel

The Ethereum roadmap has been shifted to be modular with both becoming [rollup-centric](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) and with sharding. [Rollups](https://ethereum.org/en/layer-2/#what-is-layer-2) are one of the best examples. A rollup will do the execution and then leave the consensus, data availability, and settlement for the Layer 1. That's how a Rollup can scale exponentially compared to L1. In the end, this is reflected by users as low-cost and faster transactions. Ethereum sharding is another modular approach thats been researched and worked on. Sharding is a method to distribute data across mutliple databases. You can read more about Ethereum sharding over [here](https://ethereum.org/en/upgrades/sharding/).

[Celestia](https://celestia.org/) is the first blockchain pioneering the modular blockchain architecture. It's a minimal-layer 1 that provides data availability and consensus. Celestia orders data and makes it available but does not execute the transactions. Instead, the execution is outsourced to specialized execution layers like rollups. Celestia aims to solve the Data availability problem that blockchains face. I'll not be going deep into Celestia or the data availability problem. However, there are great resources from some giga-brains, which you can find below.

Another core layer is the execution layer, thats where Fuel comes in. It's the more exciting part for me as an app developer since I can get hands-on and build apps. We'll be talking about Fuel in the next section and start building.

---

## Getting started w/Fuel

Fuel is the fastest execution layer for modular blockchains. In the modular blockchain, the execution, data availability and consensus are separate layers, and Fuel is the execution layer.

#### Fuel Features

Let's talk about some of Fuel's core pillars:
1. **Parallel transaction execution**: Most blockchains are single-threaded, meaning that only one thread is executed simultaneously. Fuel uses a UTXO model, which allows for parallel execution; this way, it can execute more threads simultaneously.
2. **Fuel Virtual Machine (FuelVM)**: Fuel has its own virtual machine to overcome some of the main drawbacks of EVM.
3. **Sway Language**: Fuel has its own domain-specific language called Sway, which is based on Rust. Force(Fuel orchestrator) is the developer toolchain for Fuel. It has a full suite of developer tools to provide developers all the resources to quickly build on the network.

---

## Building on Fuel

In this section, we'll be building a dApp on the Fuel network using Sway & Force.

