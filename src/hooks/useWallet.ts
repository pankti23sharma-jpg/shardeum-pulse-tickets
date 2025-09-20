import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { shardeumUnstablenet } from '@/config/web3'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { toast } from '@/hooks/use-toast'

export const useWallet = () => {
  const { address, isConnected, chain } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const { open } = useWeb3Modal()

  const connectWallet = async () => {
    try {
      await open()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive"
      })
    }
  }

  const disconnectWallet = () => {
    disconnect()
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully."
    })
  }

  const switchToShardeum = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      })
      return
    }

    try {
      await switchChain({ chainId: shardeumUnstablenet.id })
      toast({
        title: "Network Switched",
        description: "Successfully switched to Shardeum Unstablenet."
      })
    } catch (error) {
      console.error('Failed to switch network:', error)
      toast({
        title: "Network Switch Failed",
        description: "Failed to switch to Shardeum Unstablenet. Please try manually.",
        variant: "destructive"
      })
    }
  }

  const isOnShardeum = chain?.id === shardeumUnstablenet.id

  const formatAddress = (addr: string) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return {
    address,
    isConnected,
    chain,
    isOnShardeum,
    connectWallet,
    disconnectWallet,
    switchToShardeum,
    formatAddress: formatAddress(address || '')
  }
}