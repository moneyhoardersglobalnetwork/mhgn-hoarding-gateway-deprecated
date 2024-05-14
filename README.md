# M.H.G.N Hoarding Gateway-Full powered by 🏗 Scaffold-ETH 2


<h4 align="center">
  <a href="https://mhgn-hoarding-gateway.vercel.app">Hoarding Gateway Vercel Sepolia Testnet</a> |
  <a href="https://moneyhoardersglobal.net">M.H.G.N Official Website</a>
</h4>
<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 The M.H.G.N Hoarding Gateway is in active development. We currently are working on integrating with Chainlink CCIP and leveraging the power of USDC as a cross-chain 
digital asset to bring more value to the Blocks of Passion Protocol and M.H.G.N ecosystem as a whole.

M.H.G.N is developing on-top of the Scaffold-Eth-2 code base so as new smart contracts and repo's are shipped out by the core devs you can join in from testing to mainnet!

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://mhgn-hoarding-gateway.vercel.app/_next/image?url=%2Flogo.png&w=1920&q=75)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with M.H.G.N Hoarding Gateway, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/moneyhoardersglobalnetwork/mhgn-hoarding-gateway-full.git
cd mhgn-hoarding-gateway-full
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

//We recommend you run this before next command to update the browserlist
npx update-browserslist-db@latest

You may see a warning or error message like this
Browserslist: caniuse-lite is outdated. Please run next command npm update caniuse-lite browserslist

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

Soon you will be able to visit our [docs](https://docs.hoarderlabs.moneyhoardersglobal.net) to learn how to start building with Scaffold-ETH 2.

For all things M.H.G.N, check out our [website](https://moneyhoardersglobal.net).




## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.


ToDo's

????
////
# Vercel


yarn vercel:yolo //Deploys to production and skips linting must delete project to redeploy try deploying to production with (yarn vercel:yolo --prod) command

# Github pushing



Git Hub Staging, Commiting, Pushing
//Commands for updating repo on github(Build this out)

//Check remote origin

git remote set-url origin https://github.com/USERNAME/REPOSITORY.git

git remote -v

git add . //adds modified files to commit# mhgn-hoarding-gateway

git commit -m "update from local" // Commit your changes to be pushed to repo

Use the --no-verify option to skip git commit hooks, e.g. git commit -m "commit message" --no-verify . When the --no-verify option is used, the pre-commit and commit-msg hooks are bypassed. Copied! You can also use the -n option, which is short for --no-verify .

git push //push to repo //Push updates to repo (main)
