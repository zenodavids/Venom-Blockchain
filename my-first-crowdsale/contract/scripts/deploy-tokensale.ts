// Import necessary modules
import { Address, getRandomNonce, toNano, WalletTypes } from "locklift";

// Set constant for token root address
const TOKEN_ROOT_ADDRESS = "0:0000000000000000000000000000000000000000000000000000000000000000";

// Define an async function named main
async function main() {
  // Get the signer for the account
  const signer = await locklift.keystore.getSigner("0");

  // Check if signer exists
  // If signer exists, add the account and deploy the contract
  if (signer) {
    // Add an existing account
    const account = await locklift.factory.accounts.addExistingAccount({
      type: WalletTypes.WalletV3,
      publicKey: signer.publicKey,
    });

    // Deploy contract using factory
    const { contract: tokensale, tx } = await locklift.factory.deployContract({
      contract: "Tokensale",
      publicKey: signer.publicKey,

      // Set initialization parameters
      initParams: {
        _nonce: getRandomNonce(),
        _owner: account.address,
      } as never,

      // Set constructor parameters
      constructorParams: {
        distributedTokenRoot: new Address(TOKEN_ROOT_ADDRESS),
        supply: 100000000000,
        rate: 10,
        sendRemainingGasTo: account.address,
      } as never,

      // Set value in nanoether
      value: toNano(2),
    });

    console.log(`Tokensale deployed at: ${tokensale.address.toString()}`);
  } else {
    console.error("Signer is undefined!");
  }
}

// Call main function
main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

// 0:fa309edeb7c7a40270b2a1ed37a848444ec216cb2dc40b3bf606cb54a5a9dbdf
