# Fuel Starter Kit ⛽🌴

*This post is co-authored by Eda and Carlos*

Modular blockchains offer a new approach by separating the fundamental components of blockchains into individual modules. By focusing on specific tasks, these modules allow for increased customization and improved efficiency. You can read an introduction to the modular architecture over [here](https://eda.hashnode.dev/modular-blockchains-getting-started-with-fuel).

Fuel is building the fastest Execution Layer for modular blockchains. Sway is the domain-specific programming language for Fuel and Fuel orchestrator (Forc) is the toolchain.

This blog post is an explianer for the Fuel dApp template. It's a new starter kit to hit the ground running when building decentralized applications on Fuel!

The starter kit is built using NextJS, DaisyUI, Forc, Sway and Typescript.

## QuickStart

### Prerequisites

- [Node.js](https://nodejs.org/en/) v16.15.0 or newer
- [Yarn](https://www.npmjs.com/package/yarn)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Rust, Cargo and Forc (explained in the installation section)

### Installation

1. Install the Rust toolchain by following the steps [here](https://fuellabs.github.io/sway/v0.24.3/introduction/installation.html#dependencies)

2. The **Fuel toolchain** is required to compile Sway contracts & run them on the FuelVM. Install the Fuel toolchain by the command below; you can also find the steps [here](https://github.com/FuelLabs/fuelup)

    `$curl --proto '=https' --tlsv1.2 -sSf \ https://fuellabs.github.io/fuelup/fuelup-init.sh | sh`

3. The [beta-2 network](https://fuellabs.github.io/fuel-docs/master/networks/beta-1.html) is the second public Fuel testnet. Install the beta-2 toolchain by using the following command:
    `fuelup toolchain install beta-2`

### Getting started

1. Clone this repo & install dependencies:
```
git clone https://github.com/edakturk14/fuel-starter-kit.git
cd fuel-starter-kit
yarn install
```

2. After the installation is complete, start your app:
```
yarn next:start
```

- ? Start fuel local chain // had error, asked on discord
- yarn fuel:build
- yarn fuel:chain // start your local node
- ? FuelDeploy

## Features

- yarn to allow monorepos
- download @types automatically with the yarn plugin
- yarn scripts helpers (next/fuel start, etc)
- TW / Daisy + conf
- eslint / prettier
