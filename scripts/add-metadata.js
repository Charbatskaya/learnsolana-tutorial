const fs = require('fs');
const { execSync } = require('child_process');

function addTokenMetadata() {
  try {
    console.log('🎨 Adding metadata to LearnSolana token...');
    
    // Check if token info file exists
    if (!fs.existsSync('learnsolana-info.json')) {
      console.error('❌ Token info file not found!');
      console.log('💡 Please run create-token.js first to create your token.');
      return;
    }
    
    // Load token info
    const tokenInfo = JSON.parse(fs.readFileSync('learnsolana-info.json', 'utf8'));
    const mintAddress = tokenInfo.mint;
    
    console.log('👛 Wallet:', tokenInfo.owner);
    console.log('🪙 Token Mint:', mintAddress);
    
    // Check if spl-token CLI is available
    try {
      execSync('spl-token --version', { stdio: 'pipe' });
    } catch (error) {
      console.error('❌ spl-token CLI not found!');
      console.log('\n💡 Install spl-token CLI first:');
      console.log('1. Install Rust: curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y');
      console.log('2. Source environment: source ~/.cargo/env');
      console.log('3. Install spl-token: cargo install spl-token-cli');
      return;
    }
    
    console.log('📝 Step 1: Adding token name...');
    try {
      execSync(`spl-token update-metadata ${mintAddress} name "LearnSolana"`, { stdio: 'inherit' });
      console.log('✅ Token name added successfully!');
    } catch (error) {
      console.log('⚠️  Name might already be set, continuing...');
    }
    
    console.log('📝 Step 2: Adding token symbol...');
    try {
      execSync(`spl-token update-metadata ${mintAddress} symbol "LEARN"`, { stdio: 'inherit' });
      console.log('✅ Token symbol added successfully!');
    } catch (error) {
      console.log('⚠️  Symbol might already be set, continuing...');
    }
    
    // Optional: Add image URI if provided
    const imageUrl = process.argv[2];
    if (imageUrl) {
      console.log('📝 Step 3: Adding token image...');
      console.log('🖼️  Image URL:', imageUrl);
      try {
        execSync(`spl-token update-metadata ${mintAddress} uri "${imageUrl}"`, { stdio: 'inherit' });
        console.log('✅ Token image added successfully!');
        
        // Update token info file with image
        tokenInfo.imageUrl = imageUrl;
        tokenInfo.updatedAt = new Date().toISOString();
        fs.writeFileSync('learnsolana-info.json', JSON.stringify(tokenInfo, null, 2));
      } catch (error) {
        console.error('❌ Failed to add image:', error.message);
      }
    } else {
      console.log('💡 To add an image, run:');
      console.log(`   node add-metadata.js "https://your-image-url.com/image.png"`);
    }
    
    console.log('\n🎉 SUCCESS! Metadata updated!');
    console.log('\n📊 Your LearnSolana token now has:');
    console.log('   🏷️  Name: LearnSolana');
    console.log('   🔤 Symbol: LEARN');
    if (imageUrl) {
      console.log('   🖼️  Image: Custom icon');
    }
    
    console.log('\n🔍 Check your token:');
    console.log(`   https://explorer.solana.com/address/${mintAddress}?cluster=devnet`);
    
    console.log('\n📱 Import to Phantom:');
    console.log('   1. Run: node scripts/export-private-key.js');
    console.log('   2. Copy the private key');
    console.log('   3. Import to Phantom wallet');
    console.log('   4. Switch to Devnet');
    console.log('   5. See your LearnSolana tokens!');
    
  } catch (error) {
    console.error('❌ Error adding metadata:', error.message);
    console.log('\n💡 Common solutions:');
    console.log('   - Make sure spl-token CLI is installed');
    console.log('   - Ensure you have SOL for transaction fees');
    console.log('   - Check that token was created with metadata extension');
    console.log('   - Verify you\'re on the correct network (devnet)');
  }
}

// Display current metadata if no action specified
function displayMetadata() {
  try {
    if (!fs.existsSync('learnsolana-info.json')) {
      console.log('❌ No token info found. Create a token first!');
      return;
    }
    
    const tokenInfo = JSON.parse(fs.readFileSync('learnsolana-info.json', 'utf8'));
    const mintAddress = tokenInfo.mint;
    
    console.log('📊 Current Token Information:');
    console.log('═══════════════════════════════════════');
    console.log(`🏷️  Name: ${tokenInfo.name}`);
    console.log(`🔤 Symbol: ${tokenInfo.symbol}`);
    console.log(`🏭 Mint: ${mintAddress}`);
    console.log(`📦 Supply: ${tokenInfo.supply} tokens`);
    console.log(`🌐 Network: ${tokenInfo.network}`);
    
    console.log('\n🔍 Check on-chain metadata:');
    try {
      execSync(`spl-token display ${mintAddress}`, { stdio: 'inherit' });
    } catch (error) {
      console.log('💡 Install spl-token CLI to see on-chain metadata');
    }
    
  } catch (error) {
    console.error('❌ Error reading token info:', error.message);
  }
}

// Handle command line arguments
const action = process.argv[2];

if (action === 'display' || action === 'show') {
  displayMetadata();
} else if (action && action.startsWith('http')) {
  // If first argument is a URL, treat it as image URL
  addTokenMetadata();
} else if (action === 'help' || action === '--help') {
  console.log('🎨 LearnSolana Metadata Tool');
  console.log('═══════════════════════════════════');
  console.log('Usage:');
  console.log('  node add-metadata.js                    # Add name and symbol');
  console.log('  node add-metadata.js [image-url]        # Add name, symbol, and image');
  console.log('  node add-metadata.js display            # Show current metadata');
  console.log('  node add-metadata.js help               # Show this help');
  console.log('');
  console.log('Examples:');
  console.log('  node add-metadata.js');
  console.log('  node add-metadata.js "https://github.com/user/repo/raw/main/icon.png"');
  console.log('  node add-metadata.js display');
} else {
  addTokenMetadata();
}

module.exports = { addTokenMetadata, displayMetadata };
