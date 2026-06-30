# FutureTwin Funding: Stellar Level 2 dApp

FutureTwin Funding is a decentralized crowdfunding application built on the Stellar testnet using Soroban smart contracts. This project fulfills the requirements for the Stellar Yellow Belt (Level 2).

It features a dual-role QR code system that allows campaign creators to generate QR codes containing their contract ID, and pledgers to scan and seamlessly send XLM to the campaign.

## 🚀 Live Demo
[* Vercel or Netlify link here *
](https://stellar2-nine.vercel.app/)

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


screenshot:

<img width="766" height="167" alt="Screenshot 2026-06-30 130747" src="https://github.com/user-attachments/assets/e77ba49f-8c7e-4154-b2ea-d17d48ad8ca3" />
<img width="771" height="127" alt="Screenshot 2026-06-30 122402" src="https://github.com/user-attachments/assets/1039b977-7e07-49e7-9b6a-566a1b917d21" />
<img width="766" height="167" alt="Screenshot 2026-06-30 130747" src="https://github.com/user-attachments/assets/e8762441-c972-47ed-9449-682496107043" />
<img width="772" height="501" alt="Screenshot 2026-06-30 131357" src="https://github.com/user-attachments/assets/157d33e6-6e09-4f14-a625-ba3a1d65a8ca" />
<img width="387" height="647" alt="Screenshot 2026-06-30 133144" src="https://github.com/user-attachments/assets/3eea0937-e3d9-4a8b-ad8c-eb5fbdb747c6" />
<img width="690" height="566" alt="Screenshot 2026-06-30 133158" src="https://github.com/user-attachments/assets/e1c32835-4d70-4af4-a2a0-9afc2927c19c" />
<img width="773" height="777" alt="Screenshot 2026-06-30 133123" src="https://github.com/user-attachments/assets/bfc9924c-6457-4388-97c4-2f8071525556" />

