# learnsolana-tutorial
Complete tutorial for creating Solana tokens with custom names and images
# 🎓 LearnSolana Token Creation Tutorial

A complete, step-by-step tutorial for creating professional cryptocurrency tokens on Solana with custom names and images.

## 🎯 What You'll Learn

- How to create a Solana Token-2022 with metadata support
- Adding custom names and symbols to your token
- Uploading and linking custom images
- Importing tokens into Phantom wallet
- Troubleshooting common issues

## ✨ Final Result

By following this tutorial, you'll create a fully functional cryptocurrency token with:

- ✅ **Custom Name:** "LearnSolana"
- ✅ **Custom Symbol:** "LEARN"
- ✅ **Custom Image:** Professional graduation cap icon
- ✅ **Supply:** 100 tokens
- ✅ **Working in wallets and explorers**

## 🚀 Live Demo

**Token Address (Devnet):** `BNe5dbzXwuNA2Xu2kjthJXSmiG4dKC1VUcYV2CqW9EuS`

**View on Explorer:** [https://explorer.solana.com/address/BNe5dbzXwuNA2Xu2kjthJXSmiG4dKC1VUcYV2CqW9EuS?cluster=devnet](https://explorer.solana.com/address/BNe5dbzXwuNA2Xu2kjthJXSmiG4dKC1VUcYV2CqW9EuS?cluster=devnet)


## 🛠️ Quick Start

1. **Clone this repository:**
   ```bash
   git clone https://github.com/yourusername/learnsolana-tutorial.git
   cd learnsolana-tutorial
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Follow the setup guide:**
   See [docs/setup-guide.md](docs/setup-guide.md) for detailed instructions.

## 📚 Tutorial Steps

### Part 1: Environment Setup
- Install Solana CLI
- Configure for Devnet  
- Create wallet and get test SOL

### Part 2: Token Creation
- Set up Node.js project
- Create Token-2022 with metadata extension
- Mint tokens to your wallet

### Part 3: Adding Metadata
- Install Rust and spl-token CLI
- Add token name and symbol
- Verify on blockchain explorer

### Part 4: Custom Image
- Create/upload token image to GitHub
- Update token metadata with image URL
- Test in Phantom wallet

## 📁 Project Structure

```
learnsolana-tutorial/
├── README.md                 # This file
├── scripts/
│   ├── create-token.js       # Main token creation script
│   ├── export-private-key.js # Export wallet for Phantom
│   └── add-metadata.js       # Add name/symbol metadata
├── assets/
│   └── learnsolana-icon.png  # Token image file
├── docs/
│   ├── setup-guide.md        # Detailed setup instructions
│   ├── troubleshooting.md    # Common issues and solutions
│   └── livestream-script.md  # Script for live tutorials
└── package.json              # Node.js dependencies
```

## 🎯 Key Learning Points

### ✅ What Works
- **Token-2022 program** with metadata extensions
- **GitHub hosting** for token images (free and reliable)
- **spl-token CLI** for metadata management
- **Phantom wallet** for testing and verification

### ❌ What to Avoid
- Don't use regular SPL tokens (no metadata support)
- Don't try to add metadata after token creation without extensions
- Don't rely on JavaScript libraries for metadata (use CLI tools)
- Don't forget to test on devnet first

## 🔧 Troubleshooting

### Common Issues

**"Unknown Token" in explorer:**
- Explorer caching - try different explorers or wait
- Metadata may be correct but not displaying

**Airdrop failures:**
- Use web faucet: https://faucet.solana.com/
- Try smaller amounts (0.1 SOL instead of 2)

**Metadata errors:**
- Ensure token created with metadata extension
- Use Token-2022 program, not regular SPL

See [docs/troubleshooting.md](docs/troubleshooting.md) for complete solutions.



## 🤝 Contributing

Found an improvement? Please:
1. Fork this repository
2. Create a feature branch
3. Submit a pull request


**⭐ If this tutorial helped you, please star this repository!**

**🔗 Share with others who want to learn blockchain development!**
