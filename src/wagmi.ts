// src/wagmi.ts

import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// A configuração define as chains e os transportes (como a app se comunica com a blockchain)
export const config = createConfig({
  chains: [mainnet, sepolia], // As redes que sua dApp suportará. Sepolia é para testes.
  connectors: [
    injected(), // Suporte para carteiras injetadas no navegador, como MetaMask
  ],
  transports: {
    // O transporte HTTP usa uma URL de um provedor de RPC (Remote Procedure Call)
    // Recomendamos usar um provedor como Infura ou Alchemy para produção
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
