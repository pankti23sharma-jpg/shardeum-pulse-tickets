import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, AlertTriangle, Check } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"
import { motion, AnimatePresence } from "framer-motion"

interface WalletButtonProps {
  variant?: "neon" | "glass" | "default" | "secondary"
  size?: "sm" | "default" | "lg"
  showAddress?: boolean
  className?: string
}

const WalletButton = ({ 
  variant = "neon", 
  size = "sm", 
  showAddress = true,
  className = ""
}: WalletButtonProps) => {
  const { 
    isConnected, 
    isOnShardeum, 
    formatAddress, 
    connectWallet, 
    switchToShardeum 
  } = useWallet()

  if (!isConnected) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        onClick={connectWallet}
        className={className}
      >
        <Wallet className="w-4 h-4" />
        {size !== "sm" && "Connect Wallet"}
      </Button>
    )
  }

  if (!isOnShardeum) {
    return (
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Button 
          variant="destructive" 
          size={size} 
          onClick={switchToShardeum}
          className={className}
        >
          <AlertTriangle className="w-4 h-4" />
          {size !== "sm" && "Switch Network"}
        </Button>
        {showAddress && (
          <Badge variant="outline" className="text-xs">
            Wrong Network
          </Badge>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Button 
        variant="glass" 
        size={size}
        className={className}
      >
        <Check className="w-4 h-4 text-green-400" />
        {size !== "sm" && showAddress && formatAddress}
      </Button>
      {showAddress && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
              Shardeum
            </Badge>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default WalletButton