import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  email: string;
  name: string;
  id?: string;
}

interface Ticket {
  tokenId: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  location: string;
  tier: string;
  price: string;
  txHash?: string;
  paymentMethod?: string;
  purchaseDate: string;
  status: 'active' | 'redeemed' | 'pending_mint';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and tickets from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nft-ticket-user');
    const savedTickets = localStorage.getItem('nft-ticket-tickets');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
    
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('nft-ticket-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setTickets([]);
    localStorage.removeItem('nft-ticket-user');
    localStorage.removeItem('nft-ticket-tickets');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };

  const addTicket = (ticketData: Ticket) => {
    const newTickets = [...tickets, ticketData];
    setTickets(newTickets);
    localStorage.setItem('nft-ticket-tickets', JSON.stringify(newTickets));
  };

  const updateTicketStatus = (tokenId: string, status: Ticket['status']) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.tokenId === tokenId ? { ...ticket, status } : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('nft-ticket-tickets', JSON.stringify(updatedTickets));
  };

  const getUserTickets = () => {
    return tickets.filter(ticket => ticket.status !== 'redeemed');
  };

  const getRedeemedTickets = () => {
    return tickets.filter(ticket => ticket.status === 'redeemed');
  };

  return {
    user,
    tickets,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    addTicket,
    updateTicketStatus,
    getUserTickets,
    getRedeemedTickets
  };
};