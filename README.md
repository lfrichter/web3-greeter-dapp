# Web3 React dApp Prototype

A fundamental boilerplate for a decentralized application (dApp) built with React, Vite, wagmi, and Viem. This project demonstrates core Web3 functionalities, including wallet connection, on-chain data reading, and smart contract interaction on the Sepolia testnet.

[![React][React-shield]][React-url]
[![Vite][Vite-shield]][Vite-url]
[![TypeScript][TypeScript-shield]][TypeScript-url]
[![Wagmi][Wagmi-shield]][Wagmi-url]
[![Viem][Viem-shield]][Viem-url]
[![React Query][React_Query-shield]][React_Query-url]

[React-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Wagmi-shield]: https://img.shields.io/badge/wagmi-black?style=for-the-badge&logo=ethereum&logoColor=white
[Wagmi-url]: https://wagmi.sh/
[Viem-shield]: https://img.shields.io/badge/Viem-blue?style=for-the-badge&logo=ethereum&logoColor=white
[Viem-url]: https://viem.sh/
[React_Query-shield]: https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white
[React_Query-url]: https://tanstack.com/query/latest


## About The Project

This project serves as a starting point for building more complex dApps. It provides a clean setup for interacting with the Ethereum blockchain and includes the following features:

  * **Wallet Connectivity**: Connect to browser wallets like MetaMask using the `injected` connector.
  * **Account Information**: Display the connected user's address, balance, and current network.
  * **Smart Contract Interaction**:
      * **Read**: Fetches and displays a public greeting message from a "Greeter" smart contract on the Sepolia testnet.
      * **Write**: Allows the user to send a transaction to update the greeting message on the blockchain.
  * **Modern Tech Stack**: Built with Vite for a fast development experience, React for the UI, and the powerful wagmi/Viem combination for state management and blockchain communication.


## Built With

This project was built using the latest standards for Web3 front-end development.

  * [React.js](https://reactjs.org/)
  * [Vite](https://vitejs.dev/)
  * [TypeScript](https://www.typescriptlang.org/)
  * [wagmi](https://wagmi.sh/)
  * [Viem](https://viem.sh/)


## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Make sure you have the following installed before you begin:

  * **Node.js** (version 18.x or higher)
    ```sh
    node -v
    ```
  * **npm** (comes with Node.js)
    ```sh
    npm -v
    ```
  * A browser-based wallet extension, such as **MetaMask**.
  * Sepolia testnet ETH in your wallet to pay for gas fees. You can get some from a public faucet like [sepoliafaucet.com](https://sepoliafaucet.com/).

### Installation

1.  **Clone the repository**
    ```sh
    git clone https://github.com/lfrichter/web3-greeter-dapp.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd web3-greeter-dapp
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Start the development server**
    ```sh
    npm run dev
    ```
    Your application should now be running on `http://localhost:5173`.

-----

## Usage

Once the application is running, you can test its functionality:

1.  **Connect Your Wallet**: Click the `Connect Wallet` button. Your MetaMask extension will prompt you to approve the connection. Ensure your wallet is set to the **Sepolia** network.
2.  **View On-Chain Data**: After connecting, you will see your wallet address, balance, and the current greeting read directly from the smart contract.
3.  **Write to the Contract**: Type a new message in the input field and click the `Alterar Saudação` (Change Greeting) button.
4.  **Confirm Transaction**: MetaMask will pop up again, asking you to confirm the transaction and approve the gas fee.
5.  **Wait for Confirmation**: The UI will show a "waiting" status. Once the transaction is mined, the new greeting will automatically appear on the screen.


### Application Flowchart

This diagram shows the sequence of user actions and how the application components (React, Wagmi, MetaMask, Blockchain) interact with each other.

```mermaid
---
config:
  theme: default
  look: handDrawn
---
flowchart TD
    subgraph "💻 Frontend (Your dApp in React)"
        User["👤 User"]
        UI_Connect["🔘 'Connect' Button"]
        UI_Read["📜 Greeting Display"]
        UI_Write["📝 'Change Greeting' Form"]
        Hook_Connect["⚛️ hook: useConnect"]
        Hook_Read["⚛️ hook: useContractRead"]
        Hook_Write["⚛️ hook: useContractWrite"]
        Hook_Wait["⚛️ hook: useWaitForTransactionReceipt"]
    end

    subgraph "🦊 Wallet & Blockchain"
        Wallet["MetaMask (Browser)"]
        Contract["📜 'Greeter' Smart Contract (Sepolia)"]
    end

    %% Connection & Initial Read Flow
    User -- Clicks --> UI_Connect
    UI_Connect -- Triggers --> Hook_Connect
    Hook_Connect -- Asks for permission --> Wallet
    Wallet -- Connection Approved --> Hook_Read
    Hook_Read -- "Reads greet() function" --> Contract
    Contract -- Returns greeting --> UI_Read
    UI_Read -- Displays to --> User

    %% Write Flow
    User -- Types and submits --> UI_Write
    UI_Write -- Triggers with new text --> Hook_Write
    Hook_Write -- "Asks to sign setGreeting() transaction" --> Wallet
    Wallet -- Transaction Approved --> Hook_Wait
    Hook_Wait -- "Monitors Tx on Blockchain" --> Contract
    Contract -- "Transaction Confirmed" --> Hook_Read
```

### 💡 What the Diagram Explains:

1.  **Connection Flow:** The user clicks to connect, which triggers the `useConnect` hook. This hook "talks" to MetaMask, which asks for the user's permission. Once connected, `useContractRead` is automatically activated.
2.  **Read Flow:** `useContractRead` calls the `greet()` function (which is free and read-only) on our smart contract on the Sepolia network. The contract returns the current greeting, which is then displayed in the interface.
3.  **Write Flow:** When the user submits a new greeting, the `useContractWrite` hook is triggered. It asks MetaMask to **sign a transaction** (which costs testnet gas). After approval, the `useWaitForTransactionReceipt` hook monitors the blockchain until the transaction is confirmed. Once confirmed, `useContractRead` is re-triggered to fetch and display the new greeting, completing the cycle.