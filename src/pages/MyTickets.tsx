import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Send, Eye, Calendar, MapPin, Ticket } from "lucide-react";
import Scene3D from "@/components/3d/Scene3D";

const sampleTickets = [
  {
    id: 1,
    tokenId: "1001",
    eventTitle: "Neon Music Festival 2024",
    eventDate: "Dec 25, 2024",
    eventTime: "8:00 PM",
    location: "Crypto Arena, Los Angeles",
    seat: "VIP Section A, Row 3, Seat 15",
    price: "0.1 SHM",
    status: "active",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    tokenId: "2005",
    eventTitle: "Web3 Developer Conference",
    eventDate: "Jan 15, 2025",
    eventTime: "10:00 AM",
    location: "Tech Hub, San Francisco",
    seat: "General Admission",
    price: "0.05 SHM",
    status: "active",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    tokenId: "3012",
    eventTitle: "Digital Art Exhibition",
    eventDate: "Feb 10, 2025",
    eventTime: "6:00 PM",
    location: "Modern Gallery, New York",
    seat: "Premium Access",
    price: "0.03 SHM",
    status: "redeemed",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
  },
];

const MyTickets = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NFT Tickets
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your event tickets and view your collection
          </p>
        </motion.div>

        {sampleTickets.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 mx-auto mb-8 opacity-50">
              <Scene3D enableControls={false} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">No tickets yet</h3>
            <p className="text-muted-foreground mb-8">
              You don't have any NFT tickets. Start by purchasing tickets to amazing events!
            </p>
            <Button variant="hero" size="lg">
              Explore Events
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sampleTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card group hover:scale-105 transition-all duration-300"
              >
                {/* 3D Ticket Preview */}
                <div className="h-48 mb-4 relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <Scene3D 
                    enableControls={false} 
                    cameraPosition={[0, 0, 6]}
                    className="opacity-80"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={ticket.status === "active" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                </div>

                {/* Ticket Information */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {ticket.eventTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Token ID: #{ticket.tokenId}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {ticket.eventDate} at {ticket.eventTime}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {ticket.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Ticket className="w-4 h-4 text-accent" />
                      {ticket.seat}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="text-lg font-bold text-primary">
                      {ticket.price}
                    </div>
                    <div className="flex gap-2">
                      {ticket.status === "active" && (
                        <>
                          <Button variant="outline" size="sm">
                            <QrCode className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="glass" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Wallet Connection Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="glass-card p-6 max-w-md mx-auto">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your wallet to view your actual NFT tickets
            </p>
            <Button variant="neon" size="sm">
              Connect Wallet
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyTickets;