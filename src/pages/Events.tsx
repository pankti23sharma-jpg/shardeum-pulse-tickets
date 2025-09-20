import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Ticket, Users } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import PurchaseModal from "@/components/ticket/PurchaseModal";
import { useAuth } from "@/hooks/useAuth";

const sampleEvents = [
  {
    id: 1,
    title: "Neon Music Festival 2024",
    date: "Dec 25, 2024",
    time: "8:00 PM",
    location: "Crypto Arena, Los Angeles",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop",
    price: "0.1 SHM",
    priceUsd: "$25.00",
    tier: "VIP",
    attendees: 500,
    ticketsLeft: 50,
  },
  {
    id: 2,
    title: "Web3 Developer Conference",
    date: "Jan 15, 2025",
    time: "10:00 AM",
    location: "Tech Hub, San Francisco",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    price: "0.05 SHM",
    priceUsd: "$12.50",
    tier: "General",
    attendees: 300,
    ticketsLeft: 75,
  },
  {
    id: 3,
    title: "Digital Art Exhibition",
    date: "Feb 10, 2025",
    time: "6:00 PM",
    location: "Modern Gallery, New York",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    price: "0.03 SHM",
    priceUsd: "$7.50",
    tier: "Premium",
    attendees: 150,
    ticketsLeft: 25,
  },
];

const Events = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { isAuthenticated, login, addTicket } = useAuth();
  const handlePurchaseClick = (event: any) => {
    if (!isAuthenticated) {
      setSelectedEvent(event);
      setShowAuthModal(true);
    } else {
      setSelectedEvent(event);
      setShowPurchaseModal(true);
    }
  };

  const handleAuthSuccess = (userData: any) => {
    login(userData);
    setShowAuthModal(false);
    if (selectedEvent) {
      setShowPurchaseModal(true);
    }
  };

  const handlePurchaseSuccess = (ticketData: any) => {
    addTicket(ticketData);
    setShowPurchaseModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Discover Amazing{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore upcoming events and secure your spot with NFT tickets
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group hover:scale-105 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                 <div className="absolute top-4 right-4 glass-card px-3 py-1 text-sm font-medium text-primary">
                   {event.ticketsLeft} left
                 </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    {event.attendees} attendees
                  </div>
                </div>

                 <div className="flex items-center justify-between pt-4 border-t border-border">
                   <div className="text-2xl font-bold text-primary">
                     {event.price}
                   </div>
                   <Button 
                     variant="neon" 
                     size="sm" 
                     className="flex-1 max-w-32"
                     onClick={() => handlePurchaseClick(event)}
                   >
                     <Ticket className="w-4 h-4" />
                     Buy Ticket
                   </Button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="glass" size="lg">
            Load More Events
          </Button>
         </motion.div>
       </div>

       <AuthModal
         isOpen={showAuthModal}
         onClose={() => setShowAuthModal(false)}
         onSuccess={handleAuthSuccess}
       />

       <PurchaseModal
         isOpen={showPurchaseModal}
         onClose={() => setShowPurchaseModal(false)}
         event={selectedEvent}
         onSuccess={handlePurchaseSuccess}
       />
     </div>
   );
 };

export default Events;