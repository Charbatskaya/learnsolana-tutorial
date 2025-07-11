const { Connection, Keypair, PublicKey, SystemProgram, Transaction } = require('@solana/web3.js');
const { 
  createInitializeMintInstruction,
  createInitializeMetadataPointerInstruction,
  ExtensionType,
  getMintLen,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_2022_PROGRAM_ID
} = require('@solana/spl-token');
const fs = require('fs');
const path = require('path');

async function createLearnSolanaToken() {
  try {
    console.log('🚀 Creating LearnSolana Token...');
    console.log('💰 Target: 100 tokens at $1 each ($100 total value)');
    
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    
    // Load wallet - update this path to your wallet location
    const walletPath = path.join(process.env.HOME, 'livestream-wallet.json');
    const secretKey = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
    const payer = Keypair.fromSecretKey(new Uint8Array(secretKey));
    
    console.log('👛 Wallet:', payer.publicKey.toString());
    
    // Check balance
    const balance = await connection.getBalance(payer.publicKey);
    console.log('💰 SOL Balance:', balance / 1000000000, 'SOL');
    
    // Generate mint keypair
    const mintKeypair = Keypair.generate();
    const mint = mintKeypair.publicKey;
    
    console.log('🔨 Creating mint with metadata support...');
    
    // CRITICAL: Calculate space with metadata extension
    const extensions = [ExtensionType.MetadataPointer];
    const mintLen = getMintLen(extensions);
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);
    
    // CRITICAL: Build transaction with metadata pointer
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payer.publicKey,
        newAccountPubkey: mint,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        mint,
        payer.publicKey,
        mint,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        mint,
        9, // decimals
        payer.publicKey,
        payer.publicKey,
        TOKEN_2022_PROGRAM_ID
      )
    );
    
    // Send transaction
    const signature = await connection.sendTransaction(transaction, [payer, mintKeypair]);
    await connection.confirmTransaction(signature);
    
    console.log('✅ Mint created:', mint.toString());
    
    // Create token account (CRITICAL: Use Token-2022)
    console.log('🏦 Creating token account...');
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      payer.publicKey,
      undefined,
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
    
    console.log('✅ Token account:', tokenAccount.address.toString());
    
    // Mint 100 tokens (CRITICAL: Use Token-2022)
    console.log('🪙 Minting 100 LearnSolana tokens...');
    await mintTo(
      connection,
      payer,
      mint,
      tokenAccount.address,
      payer.publicKey,
      100 * (10 ** 9), // 100 tokens with 9 decimals
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
    
    // Save token info
    const tokenInfo = {
      name: 'LearnSolana',
      symbol: 'LEARN',
      mint: mint.toString(),
      tokenAccount: tokenAccount.address.toString(),
      owner: payer.publicKey.toString(),
      supply: 100,
      decimals: 9,
      targetPrice: '$1.00',
      totalValue: '$100.00',
      program: 'TOKEN_2022',
      metadataReady: true,
      network: 'devnet',
      createdAt: new Date().toISOString()
    };
    
    fs.writeFileSync('learnsolana-info.json', JSON.stringify(tokenInfo, null, 2));
    
    console.log('🎉 SUCCESS! LearnSolana Token Created!');
    console.log('📊 Token Details:');
    console.log('   🏷️  Name: LearnSolana');
    console.log('   🔤 Symbol: LEARN');
    console.log('   🏭 Mint Address:', mint.toString());
    console.log('   🏦 Token Account:', tokenAccount.address.toString());
    console.log('   📦 Supply: 100 LEARN tokens');
    console.log('   🎯 Target Price: $1.00 per token');
    console.log('   💵 Total Value: $100.00');
    console.log('   🌐 Network: Solana Devnet');
    console.log('   🎯 Metadata: Ready for naming');
    
    console.log('🔍 View on Explorer:');
    console.log('   https://explorer.solana.com/address/' + mint.toString() + '?cluster=devnet');
    
    console.log('📄 Token info saved to: learnsolana-info.json');
    
  } catch (error) {
    console.error('❌ Error creating token:', error.message);
    console.log('\n💡 Common solutions:');
    console.log('   - Make sure you have enough SOL (need ~0.01 SOL)');
    console.log('   - Check wallet file path');
    console.log('   - Ensure you\'re on devnet');
    console.log('   - Verify Node.js dependencies are installed');
  }
}

// Only run if called directly
if (require.main === module) {
  createLearnSolanaToken();
}

module.exports = { createLearnSolanaToken };
