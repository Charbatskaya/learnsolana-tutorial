const fs = require('fs');
const path = require('path');
const bs58 = require('bs58');

function exportPrivateKey() {
  try {
    console.log('🔑 Exporting private key for Phantom wallet...');
    
    // Update this path to match your wallet location
    const walletPath = path.join(process.env.HOME, 'livestream-wallet.json');
    
    // Check if wallet file exists
    if (!fs.existsSync(walletPath)) {
      console.error('❌ Wallet file not found at:', walletPath);
      console.log('💡 Make sure you have created a wallet first:');
      console.log('   solana-keygen new --outfile ~/livestream-wallet.json --no-bip39-passphrase');
      return;
    }
    
    const secretKey = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
    
    // Handle different bs58 import formats
    let privateKey;
    try {
      privateKey = bs58.encode(new Uint8Array(secretKey));
    } catch (e) {
      // Try default export if direct import fails
      privateKey = bs58.default.encode(new Uint8Array(secretKey));
    }
    
    console.log('✅ Your private key for Phantom:');
    console.log('═══════════════════════════════════════════════');
    console.log(privateKey);
    console.log('═══════════════════════════════════════════════');
    
    console.log('\n📱 Import to Phantom:');
    console.log('1. Open Phantom wallet');
    console.log('2. Click "Import Private Key"');
    console.log('3. Paste the key above');
    console.log('4. Switch to Devnet (Settings → Developer Settings → Change Network → Devnet)');
    console.log('5. You should see your SOL and LearnSolana tokens!');
    
    console.log('\n⚠️  SECURITY WARNING:');
    console.log('- Never share this private key');
    console.log('- Only use on Devnet (test network)');
    console.log('- For production, use hardware wallets');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('bs58')) {
      console.log('\n💡 bs58 encoding issue. Try installing bs58:');
      console.log('   npm install bs58');
    } else {
      // Backup: show raw array for manual conversion
      try {
        const walletPath = path.join(process.env.HOME, 'livestream-wallet.json');
        const secretKey = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
        console.log('\n📄 Secret key array (convert at bs58.dev):');
        console.log('[' + secretKey.join(',') + ']');
        console.log('\n🔧 Manual conversion:');
        console.log('1. Go to https://bs58.dev');
        console.log('2. Paste the array above');
        console.log('3. Click "Encode to Base58"');
        console.log('4. Copy the result for Phantom');
      } catch (e2) {
        console.log('❌ Could not read wallet file:', e2.message);
      }
    }
  }
}

// Only run if called directly
if (require.main === module) {
  exportPrivateKey();
}

module.exports = { exportPrivateKey };
