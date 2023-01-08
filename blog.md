TL;DR:

* Modular Blockchains present a new design by d**ecoupling the core functions of blockchains into distinct modules**. This way each module can specialize for the function they provide which allows for more customization and better performance.
* Fuel is building the **fastest execution layer** for the modular blockchain architecture & along with its full suite of developer products. (In the Ethereum world, you can think of Fuel as a rollup that can be customized in different ways.)
* Fuel has its own Virtual Machine called **FuelVM**. **Sway** is a domain-specific language inspired by Rust to write smart contracts on Fuel. Fuel Orchestrator(**Forc**) is the system and package for Sway.

Over the past few months, I've been learning a lot about Modular Blockchains. As an app developer, the protocol layer is not something I spend most of my time researching. However, the need for scalability becomes very clear if you've made any transaction on Ethereum mainnet; the costs are high, and the transactions are slow, especially during peak times.

Modular Blockchains present a new paradigm to solve blockchain scalability. It's an architecture where the core functions of the blockchain are handled by separate, specialized layers which can unlock the scale required for mass adoption.

In this post, I want to talk about the following:
* Blockchains architectures: monolithic & modular, covering the what's and why's
* Introduction to Fuel, the fastest modular execution layer, and why it's important for an app developer
* Building with Fuel: How to write a smart contract in Sway & deploy to Fuel

---

# Introduction to Modular Blockchains

## Blockchain Scalability

Blockchain scalability is still a major issue. Blockchains are **slow and expensive** compared to other alternative architectures. However, in recent years, several innovations have been developed that have the potential to improve scalability which are currently being explored by different teams.

You may have heard of the Scalability Trilemma (aka Blockchain Trilemma), a term coined by Vitalik. It describes the trade-off between three key properties of a blockchain network: decentralization, scalability, and security.

* **Decentralization**: distribution of power among network participants
* **Scalability**: ability to handle large amounts of transactions
* **Security**: trustworthiness of the network

![Screen Shot 2022-12-13 at 12.28.21.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1670923713236/iNpyOMkKd.png align="left")

The Scalability Trilemma states that it's only possible to get 2 out of the three properties with current technologies for a traditional (monolithic) blockchain. Therefore, one feature can only be improved by sacrificing another.

For example, a blockchain can prioritize Execution and make the transactions fast by having fewer nodes, increasing the cost to run a node and hence giving away from decentralization. The Solana Blockchain can be given as an example.

There have been many approaches to improving scalability for a monolithic blockchain where one should consider the Blockchain Trilemma. Some of these solutions have shown promise, while others have proven to be a dead end.

A **Monolithic Blockchain**, in short, is an architecture where the blockchain's core functions are handled on the same layer, Layer 1. Simply put, it is very difficult to optimize a single layer with three features. Rather than trying to optimize for all three properties on a single layer, some have suggested designing systems that break down the layer into multiple building blocks.

This is where **Modular Blockchains** come in. It's an architectural design that aims to solve scalability issues with a new approach. Modular blockchain architecture uses **modular components and features to build customizable, scalable, and flexible blockchain systems**.

Let's start with an introduction to the blockchain architecture with the core functions a blockchain provides and then look at the modular blockchains in a bit more detail.

## Blockchain Architecture

At its core, a blockchain provides four main functions: **Consensus**, **Execution,** **Data Availability** and **Settlement**. We can think of these core functions as three modules or layers that make up the blockchain.

1. **Consensus**: Orders transactions, and ensures that all nodes have the same state. The consensus protocol defines the rules on how transactions are ordered and how new blocks are added (e.g., PoW and PoS).
2. **Execution**: Processes transactions and changes the state of the blockchain (e.g., when Alice sends 1ETH to Bob, the state of the blockchain needs to be updated)
3. [**Data availability**](https://coinmarketcap.com/alexandria/article/what-is-data-availability): Ensures data is available. When new blocks are added, the data must be available upon request.
4. **Settlement**: Dispute resolution. This is how the blockchain determines valid transactions.

![Screen Shot 2022-12-13 at 12.47.00.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1671002766879/YaPbGr6bS.png align="left")

### Monolithic Blockchains

In the Monolithic blockchain architecture, all 4 **core components of the blockchain are handled on a single layer: Layer 1**. Bitcoin and Solana are examples of monolithic blockchains.

In a Monolithic Blockchain, you need resources that perform well on all the core features. Because the same layer is asked to do too many things there will be a **significant trade-off** and/or very **high hardware requirements**, and the **scalability trilemma** comes into play. Different blockchains prioritize different core features; in the end, they need to optimize for the core feature(s) that are most important.

Alongside the high hardware requirements, monolithic blockchains present **limited control and flexibility**. All apps on that blockchain must follow the pre-determined rules and standards defined by layer 1. (E.g., the programming languages you can write your smart contract in.)

### Modular Blockchains

A Modular Blockchain **breaks the blockchain down into smaller components and modules** that are **specialized components** for specific functions.

A modular design can be thought of as similar to building with Lego blocks. Each block is a module, and each module has a specific function or purpose. Modules can be combined in various ways to create a larger, more complex structure.

![Screen Shot 2022-12-14 at 07.25.01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1670991913294/9vAnd1cFO.png align="left")

Each layer only handles a few specialized tasks and must do it well.

![Screen Shot 2022-12-14 at 10.05.20.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1671001583093/5fsDRou_T.png align="left")

Having separate layers provides **scalability** and **flexibility.**
* **Scalability**: Modular blockchains are more scalable because the resources are separated. Each module of the stack is **specialized for a specific function**. Therefore, the module can optimize the resources for the particular operation, and so this would increase efficiency.
* **Flexibility**: Modular blockchains are built from modules that can be updated and swapped out. You're not limited to a particular set of resources but can choose the layers that best fit your use case. This allows the creation of chains that are **tailored to specific needs** and allows developers to **quickly and easily make changes** to the blockchain without performing a full-scale upgrade.

## Modular Blockchain Platforms: Ethereum, Celestia, Polygon Avail, Optimism & Fuel

There are different approaches to blockchain modularization and let's talk about a few of them. 🌍

### Ethereum

The Ethereum roadmap has been shifted to being modular by becoming [**rollup-centric**](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) & with **sharding**. [Rollups](https://ethereum.org/en/layer-2/#what-is-layer-2) are one of the best examples of modular architecture. A Rollup will do the execution and then leave consensus, data availability, and settlement for Layer 1. That's how a Rollup can scale exponentially compared to L1. This lowers the costs and leads to faster transactions. Ethereum sharding is a potential solution to the scalability problem of the Ethereum blockchain. It proposes to divide the network into smaller sub-networks called "shards", which can process transactions and store data independently. You can read more about Ethereum sharding over [here](https://ethereum.org/en/upgrades/sharding/).

![Screen Shot 2022-12-13 at 12.33.59.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1670924046271/Wr8z4EJGy.png align="left")

### Celestia

[Celestia](https://celestia.org/) is the first blockchain pioneer the modular blockchain architecture. It's the network that coined the term: Modular Blockchain. Simply put, **Celestia is minimal-layer 1 that provides data availability & consensus.** Celestia orders data and makes it available but does not execute the transactions. Instead, the execution is outsourced to specialized execution layers like rollups. Celestia aims to solve the [data availability problem](https://celestia.org/glossary/the-data-availability-problem/) that blockchains face. The Data Availability problem refers to the need to make sure all nodes in the network have access to the same complete and accurate data stored on the blockchain. This can become difficult to achieve, especially as the network grows in size and complexity. You can read more about Celestia & the data availability problem over here.

![Screen Shot 2022-12-14 at 07.38.40.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1670992734934/orYPhJfBh.png align="left")

### Polygon Avail

[Polygon Avail](https://wiki.polygon.technology/docs/avail/introduction/what-is-avail/) is Polygon's data availability solution. It provides ordering and recording of transactions and leaves the other tasks for separate layers to scale other blockchains with the modular architecture.

![Screen Shot 2022-12-14 at 07.41.01.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1670992871900/TnPQTOQMC.png align="left")

### Optimism

Optimism's architecture which is a modular approach is called the **OP Stack**. The Optimism team has been working on a **Bedrock** update for the OP Stack that uses the principles of modularity. The idea is to have different modules with certain functionalities (consensus, execution, settlement) that can be swapped. You can read more about the OP Stack over [here](https://optimism.mirror.xyz/fLk5UGjZDiXFuvQh6R_HscMQuuY9ABYNF7PI76-qJYs).

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1672568641728/9956132e-1958-4c6f-9c3b-1b7f707d45ba.png align="center")

### Fuel

Another core layer in the Modular blockchain stack is [Fuel](https://fuel-labs.ghost.io/) which is the **execution layer**. It's the more exciting part for me as an app developer since I can get hands-on and build some apps. We'll be talking more about Fuel & move on to writing a smart contract in Sway and deploying it to Fuel in the upcoming sections.

## Challenges w/Modular blockchains

Before moving on it's worth mentioning one of the main challenges of creating modular blockchain networks is the **time and effort required to build the infrastructure to support independent modules that can work with one another**. They can be very complex to design and require specialized expertise. The layers need to communicate and share data effectively while providing security and sufficient decentralization.

Another challenge is **bootstrapping a community to build on and use modular blockchains**. This is a common challenge for many developer tools. There need to be educators, teams building products, users willing to try it out etc. I generally view the lack of people in a new, emerging and exciting technology as an opportunity to get involved. 😌

Overall it's fair to say that I'm excited to see the modular tech stack evolve and see many top-notch teams building in the space.

---

# Getting started w/Fuel ⛽️

In the Modular Blockchain Architecture, the execution, data availability and consensus are separate layers, Fuel is the **fastest Execution Layer for Modular Blockchains**.

[Fuel network](https://www.fuel.network/) is created by Fuel Labs, which is creating a full suite of developer tools for building on Fuel, including the **Sway** programming language and Fuel orchestrator (**Forc**) which is the toolchain, to provide a top-in-class developer experience.

## Why Fuel

Here are some of the key features that make Fuel stand out:

1. **Improved Virtual Machine**: Fuel is developing its virtual machine, [Fuel Virtual Machine (FuelVM)](https://fuellabs.github.io/fuel-docs/master/what-is-fuel.html#fuelvm), to overcome some of the main drawbacks of EVM. You can read about the comparison of FuelVM and EVM over [here](https://fuellabs.github.io/fuel-docs/master/vs-evm.html).
2. [**Parallel transaction execution**](https://fuellabs.github.io/fuel-docs/master/what-is-fuel.html#parallel-transaction-execution): Most blockchains are single-threaded, meaning that only one thread is executed at a certain instant. Fuel uses a UTXO model, which allows for parallel execution; this way, it can execute more threads simultaneously.
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1671355536520/APo_-tTEF.png align="center")
3. [**Developer Tooling**](https://fuellabs.github.io/fuel-docs/master/what-is-fuel.html#developer-tooling): Fuel is internally building and maintaining a full suite of developer tools to provide developers with all the resources to easily build on the network. This includes Sway, Fuel's domain-specific language based on Rust.
4. **Flexibility with a Modular Execution Layer**: A modular execution layer is different than a rollup, and one of the key differences is that it is **not closely connected to a specific layer 1**, which gives Fuel the **flexibility to be deployed in a variety of settings**. You can choose the Data Availability which fits your case best for example. Read more over [here](https://fuellabs.github.io/fuel-docs/master/fuel-configurations.html).


## How can I build on Fuel?

First, here are your go-to resources to learn more:

* [Sway Book](https://fuellabs.github.io/sway/latest) 🌴
* [Rust SDK Book](https://fuellabs.github.io/fuels-rs/latest)
* [TypeScript SDK](https://github.com/FuelLabs/fuels-ts)

In the next section, we will be writing a smart contract in Sway & Deploying it to the Fuel Network.

---

# Writing a smart contract in Sway & Deploying to the Fuel Network

*The goal of this section is to:*
* *Provide an overview of the tools needed to build on Fuel*
* *Understand how to write & compile a smart contract in Sway to Fuel in 5 min*

## Tools:

* **Fuel:** The execution environment (blockchain)

    * **beta-2 testnet**: Fuel's second public testnet which has a bridge to Ethereum's Goerli test network.

* [Sway](https://fuellabs.github.io/sway/v0.32.2/book/)🌴: Domain-specific language for writing smart contracts on the FuelVM

* **Fuel Orchestrator(Forc)**: Package manager for Sway containing tools and commands for building on the Fuel ecosystem.

* **Fuel wallet** *please note that the wallet is under active development*

* [Fuel TestNet Faucet](https://faucet-beta-2.fuel.network/)

* [Fuel Network Explorer](https://fuellabs.github.io/block-explorer-v2)


## Installation & Setup:

1. Install the Rust toolchain by following the steps [here](https://fuellabs.github.io/sway/v0.24.3/introduction/installation.html#dependencies)

2. The **Fuel toolchain** is required to compile Sway contracts & run them on the FuelVM. Install the Fuel toolchain by the command below; you can also find the steps [here](https://github.com/FuelLabs/fuelup)
    `$curl --proto '=https' --tlsv1.2 -sSf \ https://fuellabs.github.io/fuelup/fuelup-init.sh | sh`

    * **Toolchain** is a new terminology; it refers to installing the Fuel Orchestrator(forc) and related plugins (like the fuel-core).

    * `fuelup` is the official package manager for Fuel that installs The Fuel Toolchain; you can read more on the [fuelup docs](https://fuellabs.github.io/fuelup/master/index.html) and find some [example commands](https://fuellabs.github.io/fuelup/master/examples.html)
        Run the following to verify that toolchain was installed:
        `fuelup --version forc --version fuel-core --version`

3. The [beta-2 network](https://fuellabs.github.io/fuel-docs/master/networks/beta-1.html) is the second public Fuel testnet. Install the beta-2 toolchain by using the following command:
    `fuelup toolchain install beta-2`

    Verify that the toolchain was successfully installed by running the following: `fuelup show`

    *You can also build your own toolchain with* `fuelup`*, more on it* [*here*](https://fuellabs.github.io/fuelup/master/concepts/toolchains.html)

4. You can install the VS Sway Language Extension for convenience in working with sway files.

    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1671360375367/QhmgXNEFC.png align="left")

## Create & Deploy a Smart Contract in Sway to Fuel

1. Create a smart contract project by running the following:
    `forc new fuel-project`

    Here's what the project folder looks like:

    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1671357545409/UiOTQZR4J.png align="left")

    * **Forc.toml**: manifest file that defines the project metadata for Fuel

    * **src/main.sw:** sample smart contract

2. Open **main.sw** and change the file as below. I've added the comments in the code to explain the code. (For this blog post, I have not changed the boiler template smart contract).

    ```rust
    contract;

    abi MyContract {
        fn test_function() -> bool;
    }

    impl MyContract for Contract {
        fn test_function() -> bool {
            true
        }
    }
    ```

    *For this project, we will not be looking into tests; you can use "*`forc test` "to run tests on your smart contract.

3. In the project folder, run the command below to compile your contract:
    `forc build`

    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1671357735846/v-nKL-hbA.png align="center")

    You'll see new folders created in the project repo:

    * **out:** A new folder contains the JSON files of the contract & the byte code.

    * **Forc.lock**: Contains the information about your dependencies (similar to cargo.lock). This file should not be manually edited and is generated after the build.

4. We need a deployer account to deploy the contract. Set up a Fuel wallet & create your account by following the steps [here](https://github.com/FuelLabs/forc-wallet#forc-wallet).

    I've added the steps over here as well:

    1. Initialize a wallet, make sure to save your seed phrase: `forc-wallet init`

    2. Create a new account & save your address: `forc-wallet new`


    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1671358803857/Jn1EX4ujh.png align="left")

    To sign transactions with this wallet you'll need the transaction id and the account index.

5. Get some Testnet tokens from the [faucet](https://faucet-beta-2.fuel.network/)

6. Now let's deploy the contract.
    There are a few different options for deploying the smart contract:

    * **forc** from the command line *We'll be using this option*

    * [RustSDK](https://github.com/FuelLabs/fuels-rs#deploying-a-sway-contract)

    * [TypeScriptSDK](https://github.com/FuelLabs/fuels-ts/#deploying-contracts)


    1. Deploy the contract to the beta-2 tesnet: `forc deploy --url node-beta-2.fuel.network/graphql --gas-price 1`

        You'll need to provide the wallet address.

    2. On a new terminal generate a signature to sign from your wallet:
        `forc wallet sign <transaction_id> <account_index>`

        This will give you a signature

    3. Input the signature to the first terminal. If all goes well, you should see the contract id & the block number on the console.

        You can search for the transaction-id on the [Fuel block explorer](https://fuellabs.github.io/block-explorer-v2/), make sure to add "**0x**" to the start of the transaction number.

🙌 There you go, wohoo! You've deployed a smart contract on the Fuel Beta-2 Testnet. Here's a [repo](https://github.com/FuelLabs/awesome-fuel) to follow along that contains a comprehensive list of Fuel resources!

---

Modular blockchains have the potential to provide **exponential scalability to smart contract platforms**, which is one of the most critical barriers to adoption. A second advantage unlocked by the **modular architecture is flexibility**. This can enable the creation of more efficient blockchain networks that can better meet the needs of users and applications.

I hope that this was helpful in getting a start on Fuel, more to come! Catch you on the next one!