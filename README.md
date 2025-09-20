# ShardeumNFTicket - NFT Ticketing dApp

A beautiful, modern NFT ticketing platform built on Shardeum blockchain with React, TypeScript, and Three.js.

## 🚀 Features

- **3D Animated Tickets**: Beautiful floating NFT tickets using React Three Fiber
- **Glassmorphism UI**: Modern dark theme with neon accents and glass effects
- **Blockchain Integration**: Built for Shardeum Unstablenet with MetaMask support
- **Mobile Responsive**: Fully responsive design with mobile-first approach
- **Role-based System**: Separate interfaces for organizers, buyers, and verifiers
- **QR Code System**: Generate and scan QR codes for ticket verification
- **IPFS Storage**: Decentralized metadata storage for ticket information

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- TailwindCSS with custom design system
- Framer Motion for animations
- React Three Fiber for 3D graphics
- React Router for navigation
- React Query for state management

### Blockchain
- Shardeum Unstablenet (Chain ID: 8080)
- Ethers.js for blockchain interaction
- Web3Modal for wallet connections
- ERC-721 NFT standard with ERC-2981 royalties

### Planned Backend (Future)
- FastAPI with Python
- PostgreSQL database
- JWT authentication
- IPFS integration via nft.storage

## 🎨 Design System

The app features a stunning neon dark theme with:
- **Colors**: Deep navy background with cyan, magenta, and electric purple accents
- **Effects**: Glassmorphism cards with blur effects and subtle shadows
- **Animations**: Smooth transitions, floating elements, and neon glow effects
- **Typography**: Clean, modern fonts with gradient text effects

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- MetaMask browser extension

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ShardeumNFTicket
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Shardeum Network Setup

To connect to Shardeum Unstablenet, add this network to MetaMask:

- **Network Name**: Shardeum Unstablenet
- **RPC URL**: `https://api-unstable.shardeum.org`
- **Chain ID**: `8080`
- **Currency Symbol**: `SHM`
- **Block Explorer**: `https://explorer-unstable.shardeum.org`

## 📱 App Structure

```
src/
├── components/
│   ├── 3d/              # Three.js 3D components
│   ├── features/        # Feature showcase components
│   ├── hero/           # Hero section components
│   ├── layout/         # Layout components (Header, etc.)
│   └── ui/             # Reusable UI components
├── pages/              # Page components
│   ├── Home.tsx        # Landing page with 3D hero
│   ├── Events.tsx      # Event listing page
│   ├── CreateEvent.tsx # Event creation wizard
│   ├── MyTickets.tsx   # User ticket dashboard
│   └── NotFound.tsx    # 404 page
└── styles/            # Global styles and theme
```

## 🎯 Current Features

### ✅ Implemented
- Stunning 3D hero section with animated ticket
- Responsive navigation with wallet connection UI
- Event listing with glassmorphism cards
- Multi-step event creation form
- Personal ticket dashboard with 3D previews
- Beautiful 404 page
- Complete design system with neon theme

### 🚧 In Progress
- Actual blockchain integration
- Smart contract deployment
- IPFS metadata storage
- QR code generation and scanning
- User authentication system

### 📋 Planned
- Payment processing (crypto + fiat)
- Event management dashboard
- Ticket verification system
- Secondary marketplace
- Analytics and reporting
- Mobile app (React Native)

## 🎨 Design Highlights

- **3D Ticket Animation**: Interactive floating ticket using React Three Fiber
- **Particle Effects**: Animated background particles throughout the app
- **Glassmorphism**: Modern glass-effect cards with backdrop blur
- **Neon Glows**: CSS animations with neon glow effects
- **Gradient Text**: Beautiful gradient text effects for headings
- **Smooth Transitions**: Framer Motion animations between pages

## 🔗 Smart Contracts (Planned)

```solidity
// EventTicket.sol - ERC721 with additional features
contract EventTicket is ERC721, ERC2981, Ownable, Pausable {
    function mint(address to, string memory tokenURI) external;
    function redeem(uint256 tokenId) external;
    function setRoyalty(address receiver, uint96 feeBasisPoints) external;
    // ... additional functions
}
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker (Optional)
```bash
docker build -t shardeum-nfticket .
docker run -p 8080:8080 shardeum-nfticket
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for Shardeum blockchain
- Inspired by modern Web3 UX patterns
- Design influenced by glassmorphism and neon aesthetics
- 3D graphics powered by Three.js ecosystem

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Join our Discord community
- Follow us on Twitter

---

**Made with ❤️ for the Shardeum ecosystem**