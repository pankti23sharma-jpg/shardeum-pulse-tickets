import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Wallet, User, Calendar, Ticket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ShardeumNFTicket
                </h1>
                <p className="text-xs text-muted-foreground">NFT Ticketing Platform</p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {!isHome && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/events" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Events
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/my-tickets" className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                My Tickets
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/create-event">Create Event</Link>
            </Button>
          </nav>

          {/* Wallet & User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="neon" size="sm" className="hidden sm:flex">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
            <Button variant="glass" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center space-x-2">
          {!isHome && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="w-4 h-4" />
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link to="/events">
              <Calendar className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/my-tickets">
              <Ticket className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="neon" size="sm">
            <Wallet className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;