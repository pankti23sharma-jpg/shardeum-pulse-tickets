import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { http, createConfig } from 'wagmi'
import { defineChain } from 'viem'

// Define Shardeum Unstablenet
export const shardeumUnstablenet = defineChain({
  id: 8080,
  name: 'Shardeum Unstablenet',
  nativeCurrency: {
    decimals: 18,
    name: 'Shardeum',
    symbol: 'SHM',
  },
  rpcUrls: {
    default: {
      http: ['https://api-unstable.shardeum.org'],
      webSocket: ['wss://api-unstable.shardeum.org/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Shardeum Explorer',
      url: 'https://explorer-unstable.shardeum.org',
    },
  },
  testnet: true,
})

// Get projectId from https://cloud.walletconnect.com
const projectId = 'your-walletconnect-project-id' // You'll need to replace this

const metadata = {
  name: 'ShardeumNFTicket',
  description: 'NFT Ticketing Platform on Shardeum',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [shardeumUnstablenet],
  projectId,
  metadata,
  transports: {
    [shardeumUnstablenet.id]: http()
  }
})

// Create modal
export const web3Modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true
})