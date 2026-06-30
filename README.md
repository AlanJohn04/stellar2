# FutureTwin Funding: Stellar Level 2 dApp

FutureTwin Funding is a decentralized crowdfunding application built on the Stellar testnet using Soroban smart contracts. This project fulfills the requirements for the Stellar Yellow Belt (Level 2).

It features a dual-role QR code system that allows campaign creators to generate QR codes containing their contract ID, and pledgers to scan and seamlessly send XLM to the campaign.

## 🚀 Live Demo
*(Optional: Add your Vercel or Netlify link here if you deploy it)*

## 🔗 Contract Details
- **Deployed Contract Address:** `CBYUIHHL3T4XDLIJL2PB56ZQOSYOYQVYRUN5WRLA6R7JK2ELDN74BUCC`
- **Network:** Stellar Testnet

## 💼 Wallet Options
We integrate multiple wallets using the `@creit.tech/stellar-wallets-kit` to ensure users have flexible access to the platform. 

![Wallet Options Screenshot](./docs/wallet-options.png)
*(Note: Please replace the above placeholder with an actual screenshot of the wallet connection options from your UI, and ensure the image is in the `docs` folder or update the path.)*

## 📜 Transaction Verification
You can verify our successful smart contract pledge interaction on the Stellar Explorer:
- **Transaction Hash:** `ENTER_YOUR_TRANSACTION_HASH_HERE`

*(Note: Please replace the placeholder above with a real transaction hash from when you tested the Pledge button via Freighter.)*

## 🛠 Features
- **Multi-Wallet Support**: Secure connection via Freighter and other compatible wallets.
- **Role-Based Workflows**: Separate views for Campaign Creators (Receivers) and Pledgers (Senders).
- **Interactive QR Scanner**: Scan a campaign QR code to instantly target your funding to the right smart contract.
- **Soroban Integration**: Uses `invokeHostFunction` to communicate directly with live testnet smart contracts.

## 💻 Running Locally

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) (or 3001) in your browser.
