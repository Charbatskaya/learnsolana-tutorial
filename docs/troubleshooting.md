# 🔧 Troubleshooting Guide

Common issues and solutions when creating Solana tokens.

## 🚨 Critical Issues

### ❌ "Unknown Token" in Explorer

**Problem:** Token shows as "Unknown Token" instead of "LearnSolana"

**Root Cause:** Token created without metadata extension OR metadata not added properly

**✅ Solution:**
1. **Check if metadata extension exists:**
   ```bash
   spl-token display [your-mint-address]
   ```
   Look for "Extensions" section with "Metadata"

2. **If no metadata extension:** Token must be recreated
   ```bash
   # Delete old token info and create new one
   rm learnsolana-info.json
   node scripts/create-token.js
   ```

3. **If extension exists but no name:** Add metadata
   ```bash
   node scripts/add-metadata.js
   ```

**Prevention:** Always use Token-2022 program with metadata extension from start.

---

### ❌ "custom program error: 0x33"

**Problem:** Error when trying to add metadata

**Root Cause:** Token created without metadata-pointer extension

**✅ Solution:**
```bash
# Must recreate token with proper extension
rm learnsolana-info.json
node scripts/create-token.js
node scripts/add-metadata.js
```

**Prevention:** Never use regular SPL tokens - always use Token-2022 with extensions.

---

## 💰 SOL and Airdrop Issues

### ❌ "airdrop request failed"

**Problem:** Cannot get test SOL from CLI

**✅ Solutions:**

**Option 1: Web Faucet**
```bash
# Get your wallet address
solana address
# Visit https://faucet.solana.com/ and paste address
```

**Option 2: Different Amounts**
```bash
solana airdrop 0.1  # Try smaller amount
solana airdrop 0.5  # Gradually increase
```

**Option 3: Wait and Retry**
```bash
sleep 60 && solana airdrop 1  # Wait for rate limit reset
```

**Option 4: Different RPC**
```bash
solana config set --url https://api.devnet.solana.com
solana airdrop 1
```

---

### ❌ "Insufficient funds"

**Problem:** Not enough SOL for transactions

**✅ Solution:**
```bash
# Check balance
solana balance

# Get more SOL (need ~0.01 SOL for token creation)
solana airdrop 1
```

---

## 🔧 Installation Issues

### ❌ "solana: command not found"

**Problem:** Solana CLI not installed or not in PATH

**✅ Solutions:**

**Option 1: Homebrew Install**
```bash
brew install solana
```

**Option 2: Official Installer**
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
export PATH="/Users/$(whoami)/.local/share/solana/install/active_release/bin:$PATH"
echo 'export PATH="/Users/$(whoami)/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.zshrc
```

**Option 3: Manual PATH Fix**
```bash
# Find Solana installation
find ~ -name "solana" -type f 2>/dev/null

# Add to PATH (replace with actual path)
export PATH="/path/to/solana/bin:$PATH"
```

---

### ❌ "spl-token: command not found"

**Problem:** spl-token CLI not installed

**✅ Solution:**
```bash
# Install Rust first
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source ~/.cargo/env

# Install spl-token CLI
cargo install spl-token-cli

# Verify installation
spl-token --version
```

---

### ❌ "bs58.encode is not a function"

**Problem:** Wrong bs58 package version or import issue

**✅ Solutions:**

**Option 1: Reinstall Package**
```bash
npm uninstall bs58
npm install bs58@5.0.0
```

**Option 2: Manual Conversion**
```bash
# Get wallet array
cat ~/livestream-wallet.json

# Convert at https://bs58.dev
# Paste array, click "Encode to Base58"
```

**Option 3: Use Alternative Export**
```javascript
// In export-private-key.js, try both methods:
try {
  privateKey = bs58.encode(new Uint8Array(secretKey));
} catch (e) {
  privateKey = bs58.default.encode(new Uint8Array(secretKey));
}
```

---

## 📱 Phantom Wallet Issues

### ❌ Token Not Showing in Phantom

**Problem:** Imported wallet but no tokens visible

**✅ Checklist:**
1. **Correct Network:** Switch to Devnet in Phantom
2. **Correct Wallet:** Verify address matches: `solana address`
3. **Token Created:** Check if token creation completed successfully
4. **Wait Time:** Sometimes takes 1-2 minutes to appear

**✅ Solution:**
```bash
# Verify everything matches
solana address
cat learnsolana-info.json | grep owner
# These should be the same address
```

---

### ❌ "Import Failed" in Phantom

**Problem:** Private key rejected by Phantom

**✅ Solutions:**

**Option 1: Re-export Key**
```bash
node scripts/export-private-key.js
# Copy the EXACT key (no extra spaces)
```

**Option 2: Verify Key Format**
- Key should be ~88 characters long
- Should start with letters/numbers (base58 format)
- No brackets or commas

**Option 3: Create New Wallet**
```bash
# Create fresh wallet if key is corrupted
solana-keygen new --outfile ~/new-wallet.json --no-bip39-passphrase
solana config set --keypair ~/new-wallet.json
```

---

## 🌐 Network Issues

### ❌ "Connection Refused" or Timeout

**Problem:** Cannot connect to Solana network

**✅ Solutions:**

**Option 1: Check Network Config**
```bash
solana config get
# Should show: https://api.devnet.solana.com
```

**Option 2: Switch RPC**
```bash
solana config set --url https://api.devnet.solana.com
# Or try: https://devnet.solana.com
```

**Option 3: Check Internet**
```bash
ping google.com  # Verify internet connection
```

---

## 🔍 Debugging Steps

### Step 1: Verify Environment
```bash
# Check all installations
solana --version
node --version
npm --version
spl-token --version

# Check configuration
solana config get
solana address
solana balance
```

### Step 2: Check Token Status
```bash
# If token exists, check details
cat learnsolana-info.json
spl-token accounts
spl-token display [mint-address]
```

### Step 3: Verify Network
```bash
# Ensure on devnet
solana config get | grep devnet
# Should show devnet URL
```

## 💡 Prevention Tips

### ✅ Best Practices
- **Always use Token-2022** program
- **Enable metadata extension** from creation
- **Test on devnet first**
- **Backup wallet files**
- **Document token addresses**
- **Check SOL balance** before operations

### ✅ Before Creating Token
- [ ] Solana CLI installed and working
- [ ] On devnet network
- [ ] Wallet created and funded (>0.01 SOL)
- [ ] Node.js dependencies installed
- [ ] spl-token CLI ready (for metadata)

### ✅ Success Verification
- [ ] Token appears in `spl-token accounts`
- [ ] Metadata shows in `spl-token display`
- [ ] Explorer shows token details
- [ ] Phantom wallet displays correctly

## 🆘 Still Need Help?

1. **Check the logs** - Copy exact error messages
2. **Verify all prerequisites** - Follow setup guide completely  
3. **Try on fresh environment** - Use different user account
4. **Open GitHub issue** - Include full error output
5. **Join community** - Ask in Solana Discord

---

**Remember:** Most issues are environment-related. When in doubt, start fresh! 🔄
