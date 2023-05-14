// Importing required modules
import { VenomConnect } from 'venom-connect';
import { ProviderRpcClient } from 'everscale-inpage-provider';
import { EverscaleStandaloneClient } from 'everscale-standalone-client';

// Creating and exporting function to initialize VenomConnect
export const initVenomConnect = async () => {
  // Returning new instance of VenomConnect with required options
  return new VenomConnect({
    // Setting theme to 'light','dark' or 'venom'
    // get more advanced theme features from https://github.com/web3sp/venom-connect/tree/main/src
    theme: 'venom',
    // Setting network ID to 1000 for venom testnet or 1 for venom mainnet
    checkNetworkId: 1000,

    // object in which the keys are the wallet IDs and the values are the settings objects for the corresponding wallet.current available I.Ds are venomwallet and everwallet
    providersOptions: {
      // Setting provider options for venomwallet
      venomwallet: {
        // Specifying ways to connect to wallet
        //  array with the available ways to connect this wallet
        walletWaysToConnect: [
          {
            // Specifying the package to use
            package: ProviderRpcClient,
            // Setting package options, including fallback option
            packageOptions: {
              fallback:
                VenomConnect.getPromise('venomwallet', 'extension') ||
                (() => Promise.reject()),
              forceUseFallback: true,
            },
            // Setting standalone package options, including fallback option
            packageOptionsStandalone: {
              fallback: () =>
                EverscaleStandaloneClient.create({
                  connection: {
                    id: 1000, // 1 for venom mainnet
                    group: 'venom_testnet',
                    type: 'jrpc',
                    data: {
                      endpoint: 'https://jrpc-testnet.venom.foundation/rpc',
                    },
                  },
                }),
              forceUseFallback: true,
            },
            // Specifying the id and type of connection
            id: 'extension',
            type: 'extension',
          },
        ],
        // Specifying default ways to connect to wallet
        defaultWalletWaysToConnect: ['mobile', 'ios', 'android'],
      },
    },
  });
};
