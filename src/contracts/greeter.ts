// src/contracts/greeter.ts

// Endereço do contrato "Greeter" publicado na rede de testes Sepolia
export const greeterAddress = '0x096919de2524458A32934251242395b591C23b43';

// ABI (Application Binary Interface) do contrato.
// É um JSON que descreve as funções do contrato para que nosso código saiba como interagir com ele.
export const greeterAbi = [
  {
    inputs: [{ internalType: 'string', name: '_greeting', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    // Função de LEITURA (view) chamada "greet". Não custa gás.
    name: 'greet',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    // Função de ESCRITA (nonpayable) chamada "setGreeting". Custa gás para ser executada.
    name: 'setGreeting',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'string', name: '_greeting', type: 'string' }],
    outputs: [],
  },
] as const; // O 'as const' ajuda o TypeScript a inferir os tipos de forma mais precisa
