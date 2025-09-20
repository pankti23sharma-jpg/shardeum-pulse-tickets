import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wallet, CreditCard, Ticket, Calendar, MapPin, Clock, Check, X } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { toast } from "@/hooks/use-toast";
import Scene3D from "@/components/3d/Scene3D";

interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  priceUsd: string;
  image: string;
  ticketsLeft: number;
  tier: string;
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData | null;
  onSuccess: (ticketData: any) => void;
}

const PurchaseModal = ({ isOpen, onClose, event, onSuccess }: PurchaseModalProps) => {
  const [purchaseStep, setPurchaseStep] = useState<'select' | 'processing' | 'success'>('select');
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'fiat'>('crypto');
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected, isOnShardeum, connectWallet, switchToShardeum } = useWallet();

  const handleCryptoPurchase = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    if (!isOnShardeum) {
      await switchToShardeum();
      return;
    }

    setIsProcessing(true);
    setPurchaseStep('processing');

    // Mock blockchain transaction - replace with actual smart contract interaction
    setTimeout(() => {
      const mockTicketData = {
        tokenId: Math.floor(Math.random() * 10000).toString(),
        eventId: event?.id,
        eventTitle: event?.title,
        eventDate: event?.date,
        eventTime: event?.time,
        location: event?.location,
        tier: event?.tier,
        price: event?.price,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        purchaseDate: new Date().toISOString(),
        status: 'active'
      };

      setPurchaseStep('success');
      onSuccess(mockTicketData);
      
      toast({
        title: "NFT Ticket Purchased!",
        description: `Your ticket NFT #${mockTicketData.tokenId} has been minted successfully.`
      });

      setIsProcessing(false);
    }, 3000);
  };

  const handleFiatPurchase = async () => {
    setIsProcessing(true);
    setPurchaseStep('processing');

    // Mock fiat payment - replace with actual payment processor
    setTimeout(() => {
      const mockTicketData = {
        tokenId: Math.floor(Math.random() * 10000).toString(),
        eventId: event?.id,
        eventTitle: event?.title,
        eventDate: event?.date,
        eventTime: event?.time,
        location: event?.location,
        tier: event?.tier,
        price: event?.priceUsd,
        paymentMethod: 'card',
        purchaseDate: new Date().toISOString(),
        status: 'pending_mint'
      };

      setPurchaseStep('success');
      onSuccess(mockTicketData);
      
      toast({
        title: "Ticket Reserved!",
        description: "Your NFT ticket will be minted within 24 hours."
      });

      setIsProcessing(false);
    }, 2000);
  };

  const resetModal = () => {
    setPurchaseStep('select');
    setPaymentMethod('crypto');
    setIsProcessing(false);
    onClose();
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-lg glass-card border-glass-border/50">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Purchase Ticket
            </span>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {purchaseStep === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Event Info */}
              <Card className="p-4 glass-card">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{event.title}</h3>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h4 className="font-semibold">Choose Payment Method</h4>
                
                <div className="grid gap-3">
                  <Card 
                    className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                      paymentMethod === 'crypto' 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'glass-card hover:bg-white/5'
                    }`}
                    onClick={() => setPaymentMethod('crypto')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">Crypto Payment</div>
                          <div className="text-sm text-muted-foreground">Pay with SHM</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{event.price}</div>
                        <Badge variant="outline" className="text-xs">Instant NFT</Badge>
                      </div>
                    </div>
                  </Card>

                  <Card 
                    className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                      paymentMethod === 'fiat' 
                        ? 'ring-2 ring-secondary bg-secondary/5' 
                        : 'glass-card hover:bg-white/5'
                    }`}
                    onClick={() => setPaymentMethod('fiat')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-secondary" />
                        <div>
                          <div className="font-medium">Card Payment</div>
                          <div className="text-sm text-muted-foreground">Pay with USD</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-secondary">{event.priceUsd}</div>
                        <Badge variant="outline" className="text-xs">24h Mint</Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Purchase Button */}
              <div className="space-y-3">
                {paymentMethod === 'crypto' ? (
                  <Button 
                    onClick={handleCryptoPurchase}
                    className="w-full"
                    variant="neon"
                    size="lg"
                    disabled={isProcessing}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {!isConnected ? 'Connect Wallet' : 
                     !isOnShardeum ? 'Switch to Shardeum' : 
                     `Purchase for ${event.price}`}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleFiatPurchase}
                    className="w-full"
                    variant="secondary"
                    size="lg"
                    disabled={isProcessing}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Purchase for {event.priceUsd}
                  </Button>
                )}
                
                <p className="text-xs text-muted-foreground text-center">
                  {event.ticketsLeft} tickets remaining
                </p>
              </div>
            </motion.div>
          )}

          {purchaseStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-24 h-24 mx-auto">
                <Scene3D enableControls={false} className="animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Processing Payment</h3>
                <p className="text-muted-foreground">
                  {paymentMethod === 'crypto' 
                    ? 'Minting your NFT ticket on the blockchain...' 
                    : 'Processing your payment...'}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </motion.div>
          )}

          {purchaseStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-green-400" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-green-400">Success!</h3>
                <p className="text-muted-foreground">
                  Your NFT ticket has been {paymentMethod === 'crypto' ? 'minted' : 'reserved'} successfully.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetModal} className="flex-1">
                  Continue Shopping
                </Button>
                <Button variant="neon" onClick={resetModal} className="flex-1">
                  View My Tickets
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;