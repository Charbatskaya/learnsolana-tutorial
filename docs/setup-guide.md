# 🛠️ Setup Guide - LearnSolana Tutorial

Complete setup instructions for creating your own Solana token with custom name and image.

## 📋 Prerequisites

- **macOS or Linux** (Windows users can use WSL)
- **Node.js 18+** installed
- **Basic terminal knowledge**
- **Phantom wallet** (for testing)

## ⚡ Quick Setup

### 1. Install Solana CLI

**Option A: Using Homebrew (macOS)**
```bash
brew install solana
```

**Option B: Official installer (All platforms)**
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
export PATH="/Users/$(whoami)/.local/share/solana/install/active_release/bin:$PATH"
```

### 2. Configure for Devnet
```bash
solana config set --url https://api.devnet.solana.com
solana config get
```

### 3. Create Wallet
```bash
solana-keygen new --outfile ~/livestream-wallet.json --no-bip39-passphrase
solana config set --keypair ~/livestream-wallet.json
```

### 4. Get Test SOL

**CLI Method:**
```bash
solana airdrop 2
```

**If airdrop fails (common), use web faucet:**
1. Go to: https://faucet.solana.com/
2. Select "Devnet"
3. Paste your wallet address: `solana address`
4. Request SOL

### 5. Clone and Setup Project
```bash
git clone https://github.com/yourusername/learnsolana-tutorial.git
cd learnsolana-tutorial
npm install
```

## 🚀 Create Your Token

### Step 1: Create Token
```bash
npm run create-token
```

**Expected output:**
```
🚀 Creating LearnSolana Token...
👛 Wallet: [your-wallet-address]
💰 SOL Balance: 2 SOL
🔨 Creating mint with metadata support...
✅ Mint created: [mint-address]
🏦 Creating token account...
✅ Token account: [token-account-address]
🪙 Minting 100 LearnSolana tokens...
🎉 SUCCESS! LearnSolana Token Created!
```

### Step 2: Install Rust and spl-token CLI

**Install Rust:**
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.cargo/env
```

**Install spl-token CLI:**
```bash
cargo install spl-token-cli
```

### Step 3: Add Token Metadata
```bash
npm run add-metadata
```

### Step 4: Add Custom Image (Optional)

**Upload your image to GitHub:**
1. Create public repository
2. Upload your image file
3. Get raw URL

**Add image to token:**
```bash
node scripts/add-metadata.js "https://raw.githubusercontent.com/user/repo/main/image.png"
```

### Step 5: Import to Phantom
```bash
npm run export-key
```

Copy the private key and import to Phantom wallet.

## 🔧 Advanced Configuration

### Custom Wallet Path
Edit `scripts/create-token.js` line 17:
```javascript
const walletPath = path.join(process.env.HOME, 'your-wallet-name.json');
```

### Different Token Supply
Edit `scripts/create-token.js` line 87:
```javascript
100 * (10 ** 9), // Change 100 to your desired supply
```

### Custom Token Details
Edit the `tokenInfo` object in `scripts/create-token.js`:
```javascript
const tokenInfo = {
  name: 'YourTokenName',        // Change this
  symbol: 'YOUR',               // Change this
  // ... rest stays the same
};
```

## ✅ Verification

### Check Token on Explorer
1. Run: `cat learnsolana-info.json | grep mint`
2. Copy the mint address
3. Visit: `https://explorer.solana.com/address/[mint-address]?cluster=devnet`

### Verify in Phantom
1. Import private key to Phantom
2. Switch to Devnet
3. Check for your tokens

## 🎯 Success Indicators

**✅ Token Created Successfully:**
- Mint address generated
- Token account created
- 100 tokens minted
- JSON file saved

**✅ Metadata Added Successfully:**
- Name shows as "LearnSolana" 
- Symbol shows as "LEARN"
- Explorer displays properly

**✅ Phantom Integration Working:**
- Private key exported
- Wallet imported successfully
- Tokens visible in Phantom

## 🔍 Next Steps

After successful setup:
1. **Experiment** with different token parameters
2. **Learn** about token transfers and trading
3. **Explore** DeFi integration possibilities
4. **Build** applications using your token

## 💡 Tips for Success

- **Always test on devnet first**
- **Keep your private keys secure** 
- **Document your token addresses**
- **Backup your wallet files**
- **Start with small amounts**

---

**Need help?** Check our [troubleshooting guide](troubleshooting.md) or open an issue!
