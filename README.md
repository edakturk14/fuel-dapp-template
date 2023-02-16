# Fuel Starter Kit ⛽🌴

The best way to get started building decentralized applications on Fuel! Built using NextJS, DaisyUI, Forc, Sway and Typescript.

- ✅ Smart contract in Sway
- 🛠 Easily setup your local toolchain or deploy to the Fuel Beta Testnet
- 👛 Fuel wallet connection

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

Clone this repo & install dependencies:
```
git clone https://github.com/edakturk14/fuel-starter-kit.git
cd fuel-starter-kit
yarn install
```

### Local Deployments
1. Start the fuel chain locally
```
yarn fuel:chain
```

2. Deploy the example contract locally. Make sure to save the Contract ID.
```
yarn fuel:deploy:local
```

3. Update Contract ID (result from fuel:deploy:local) in `.env.development`.

4. Create the contract typings for the front-end app
```
yarn next:contract:typings
```

5. Start your app and visit http://localhost:3000
```
yarn next:start
```

### Testnet deployments:

1. Generate a testnet wallet; you can follow the steps [here](https://fuellabs.github.io/fuel-docs/master/developer-quickstart.html#deploy-the-contract)

2. Deploy the example contract
```
yarn fuel:deploy:testnet
```

The command will prompt you to sign the transaction. You can do it with:

```
forc wallet sign --id MESSAGE_TO_SIGN --account-index 0
```

3. Update .env.development
  - NEXT_PUBLIC_NETWORK=testnet
  - NEXT_PUBLIC_WALLET_SECRET (you can use the same account used for the deployment. Get the secret with `forc wallet export --account-index 0`)
  - NEXT_PUBLIC_CONTRACT_ID (displayed after deploying the contract)

4. Create the contract typings for the front-end app
```
yarn next:contract:typings
```

5. Start your app and visit http://localhost:3000
```
yarn next:start
```