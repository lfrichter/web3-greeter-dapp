
// src/components/WalletInfo.tsx

import React, { useState } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useContractRead,
  useContractWrite,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { greeterAddress, greeterAbi } from '../contracts/greeter';

export function WalletInfo() {
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending: isConnecting, error: connectionError } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address: address });

  // Local state to store the new greeting input by the user
  const [newGreeting, setNewGreeting] = useState('');

  // 1. Contract READ hook
  const { data: currentGreeting, isLoading: isReading } = useContractRead({
    address: greeterAddress,
    abi: greeterAbi,
    functionName: 'greet',
    // wagmi will automatically re-fetch this data on blockchain changes!
  });

  // 2. Contract WRITE hook
  const { data: writeData, writeContract, isPending: isWriting } = useContractWrite();

  // 3. Hook to WAIT for the transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: writeData, // The hash of the transaction we are waiting for
  });

  // Function to handle the greeting submission
  const handleSetGreeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGreeting) {
      writeContract({
        address: greeterAddress,
        abi: greeterAbi,
        functionName: 'setGreeting',
        args: [newGreeting], // We pass the new text as an argument
      });
    }
  };

  // --- UI Rendering ---

  if (isConnected) {
    return (
      <div>
        <h2>Wallet Connected</h2>
        <p>Address: {address}</p>
        <p>Network: {chain?.name}</p>
        <p>Balance: {balance?.formatted} {balance?.symbol}</p>
        <button onClick={() => disconnect()} style={{ backgroundColor: '#ff6961' }}>
          Disconnect
        </button>

        <hr style={{ margin: '2rem 0', width: '50%' }} />

        <h2>Contract Interaction</h2>
        <div>
          <p>Current Greeting:
            <strong>
              {isReading ? 'Fetching greeting...' : ` "${currentGreeting}"`}
            </strong>
          </p>
        </div>

        <form onSubmit={handleSetGreeting}>
          <input
            type="text"
            placeholder="Enter new greeting"
            value={newGreeting}
            onChange={(e) => setNewGreeting(e.target.value)}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" disabled={isWriting || isConfirming}>
            {isWriting ? 'Sending...' : isConfirming ? 'Waiting for confirmation...' : 'Set Greeting'}
          </button>
        </form>

        {isConfirmed && <p style={{ color: '#7cfc00' }}>Transaction confirmed successfully!</p>}
      </div>
    );
  }

  // --- Rendering for the disconnected state with feedback ---
  return (
    <div>
      <button
        onClick={() => connect({ connector: injected() })}
        disabled={isConnecting}
      >
        {isConnecting ? 'Opening wallet...' : 'Connect Wallet (MetaMask)'}
      </button>

      {connectionError && (
        <p style={{ color: '#ff6961', marginTop: '1rem' }}>
          Falha ao conectar: {connectionError.shortMessage || connectionError.message}
        </p>
      )}
    </div>
  );
}
